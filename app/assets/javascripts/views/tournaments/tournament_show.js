TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function (options) {
    this.tournaments = options.tournaments;
    this.follows = this.model.follows();
    this.registrations = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.registrations, "add", this.addTeamName);
    this.listenTo(this.registrations, "remove", this.removeTeamName);
    this.listenTo(this.registrations, "add remove", this.bracketView);
    this.addNumFollows();
    this.renderTeams();
  },

  events: {
    "click .register-button": "registerAction",
    "click .edit-button": "editTournament",
    "click .delete-button": "deleteTournament"
  },

  addNumFollows: function () {
    var view = new TournaGen.Views.TournamentFollows({
      model: this.model,
      collection: this.follows
    });

    this.addSubview("div.num-follows-container", view);
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

    if (this.model.get("isDoubleElim")) {
      this.$('.doubleElimination').trigger("click");
    }

    this.$('.jQBracket').addClass("total-" + this.model.get("numRounds"));
    this.$('.label').unbind().removeClass("editable");
  },

  checkAuthorized: function () {
    if (this.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
  },

  deleteTournament: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        Backbone.history.navigate("tournaments", { trigger: true });
      }.bind(this)
    });
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
        this.registrations.add(regist);
        $(".register-button").html("Unregister From Tournament");
        this.model.set("registered", true);
        this.model.set("registrationId", regist.get("id"));
        this.model.fetch();
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
    if (this.registrations.length === 0) {
      var noViews = $("<li>");
      noViews.addClass("list-group-item").html("None");
      this.$('ul.teams-index').html(noViews);
    } else {
      this.registrations.each(this.addTeamName.bind(this));
    }
  },

  saveResults: function (results) {
    this.model.set("results", results.results);
    this.model.save({});
  },

  unregisterTeam: function () {
    var registration = this.registrations.findWhere({ "team_id": TournaGen.CURRENT_USER.teamId });

    registration.destroy({
      success: function (model) {
        this.registrations.remove(registration);
        $(".register-button").html("Register For Tournament");
        this.model.set("registered", false);
        this.model.fetch();
      }.bind(this)
    });
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

    this.$('.jQBracket').addClass("total-" + this.model.get("numRounds"));
  }
});
