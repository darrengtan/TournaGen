TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function () {
    this.collection = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTeamName);
    this.listenTo(this.collection, "remove", this.removeTeamName);
    this.renderTeams();
  },

  events: {
    "click .register-button": "teamAction"
  },

  saveData: function (results) {
    debugger;
  },

  changeBracket: function () {
    var data = {
      teams : this.model.get("seeds"),
      results : []
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data,
      save: this.saveData
    });
  },

  addTeamName: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationShow({ model: registration });
    this.addSubview("ul.teams-index", view);
  },

  checkAuthorized: function () {
    if (this.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
  },

  viewBracket: function () {
    var data = {
      teams : this.model.get("seeds"),
      results : []
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data
    });
  },

  removeTeamName: function (registration) {
    this.removeModelSubview("ul.teams-index", registration);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.attachSubviews();
    if (!this.model.get("max_teams")) {
      this.waitForFetch();
    } else if (this.model.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeamName.bind(this));
  },

  registerTeam: function () {
    var registration = new TournaGen.Models.Registration({
      tournament_id: this.model.get("id")
    });
    registration.save({}, {
      success: function (regist) {
        this.collection.add(regist);
        $(".register-button").html("Unregister");
        this.model.set("registered", true);
        this.model.set("registrationId", regist.get("id"));
      }.bind(this)
    });
  },

  teamAction: function (e) {
    e.preventDefault();
    if (!this.model.get("registered")) {
      this.registerTeam();
    } else {
      this.unregisterTeam();
    }
  },

  unregisterTeam: function () {
    var registration = this.collection.findWhere({
      'team_id': TournaGen.CURRENT_USER.teamId
    });

    registration.destroy({
      success: function (model) {
        this.collection.remove(registration);
        $(".register-button").html("Register");
        this.model.set("registered", false);
      }.bind(this)
    });
  },

  waitForFetch: function () {
    return;
  }
});
