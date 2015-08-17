TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function (options) {
    this.tournaments = options.tournaments;
    this.collection = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTeamName);
    this.listenTo(this.collection, "remove", this.removeTeamName);
    this.listenTo(this.collection, "add remove", this.bracketView);
    this.renderTeams();
  },

  events: {
    "click .register-button": "registerAction",
    "click .edit-button": "editTournament"
  },

  addTeamName: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationTeamShow({ model: registration });
    this.addSubview("ul.teams-index", view);
  },

  bracketView: function () {
    if (!this.model.get("max_teams")) {
      return this;
    } else if (this.model.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
  },

  changeBracket: function () {
    this.$('#bracket-container .bracket-body').empty();
    var data = {
      teams : this.model.get("seeds"),
      results : this.model.get("results")
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data,
      save: this.saveResults.bind(this)
    });
  },

  checkAuthorized: function () {
    if (this.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
  },

  editTournament: function (e) {
    e.preventDefault();
    var modal = new TournaGen.Views.TournamentForm({
      model: this.model,
      collection: this.tournaments
    });

    $('body').append(modal.$el);
    modal.render();
  },

  viewBracket: function () {
    this.$('#bracket-container .bracket-body').empty();
    var data = {
      teams : this.model.get("seeds"),
      results : this.model.get("results")
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data
    });
  },

  removeTeamName: function (registration) {
    this.removeModelSubview("ul.teams-index", registration);
  },

  registerAction: function (e) {
    e.preventDefault();
    if (!this.model.get("registered")) {
      this.registerTeam();
    } else {
      this.unregisterTeam();
    }
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

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.attachSubviews();

    this.bracketView();

    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeamName.bind(this));
  },

  saveResults: function (results) {
    this.model.set("results", results.results);
    this.model.save({});
  },

  unregisterTeam: function () {
    var registration = this.collection.findWhere({ "team_id": TournaGen.CURRENT_USER.teamId });

    registration.destroy({
      success: function (model) {
        this.collection.remove(registration);
        $(".register-button").html("Register");
        this.model.set("registered", false);
      }.bind(this)
    });
  }
});
