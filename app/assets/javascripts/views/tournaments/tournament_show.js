TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function (options) {
    this.tournaments = options.tournaments;
    this.follows = this.model.follows();
    this.registrations = this.model.registrations();
    this.listenTo(this.model, "sync change", this.render);
    this.listenTo(this.registrations, "add", this.addTeamName);
    this.listenTo(this.registrations, "remove", this.removeTeamName);
    this.listenTo(this.registrations, "add remove", this.bracketView);
    this.registrations.each(this.addTeamName.bind(this));
    this.addNumFollows();
  },

  events: {
    "click .register-button": "registerAction",
    "click .edit-button": "editTournament",
    "click .delete-button": "deleteConfirmation"
  },

  // add numFollows subview that updates itself on its own
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

  // check if current user created tournament
  bracketView: function () {
    if (!this.model.get("max_teams")) {
      return this;
    } else if (this.model.get("authorized")) {
      this.changeBracket();
    } else {
      this.viewBracket();
    }
  },

  // user can update bracket
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

    // press double elimination button if doubleElim
    if (this.model.get("isDoubleElim")) {
      this.$('.doubleElimination').trigger("click");
    }

    // user can't change name of team
    this.$('.jQBracket').addClass("total-" + this.model.get("num_rounds"));
    this.$('.label').unbind().removeClass("editable");
  },

  deleteConfirmation: function (e) {
    e.preventDefault();
    var modal = new TournaGen.Views.TournamentDeleteConfirmation({
      model: this.model
    });

    $('body').append(modal.$el);
    modal.render();
  },

  editTournament: function (e) {
    // edit tournament details
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

  // perform opposite action based on user registered to tournament
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
        // update html and model for quick visual change
        $(".register-button").html("Unregister From Tournament");
        this.model.set("registered", true);
        this.model.set("registrationId", regist.get("id"));
        this.model.fetch();
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    // show loading spinner while fetching
    if (this.model.fetching) {
      this.$el.html(JST["loading_spinner"]());
      this.model.fetching = false;
      return this;
    }
    this.attachSubviews();
    this.checkTeamsLength();
    this.bracketView();
    return this;
  },

  // display none if no teams registered
  checkTeamsLength: function () {
    if (this.registrations.length === 0) {
      var noViews = $("<li>");
      noViews.addClass("list-group-item").html("None");
      this.$('ul.teams-index').html(noViews);
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

  // user can see but not edit tournament bracket
  viewBracket: function () {
    this.$('#bracket-container .bracket-body').empty();
    var data = {
      teams : this.model.get("seeds"),
      results : this.model.get("results")
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data
    });

    this.$('.jQBracket').addClass("total-" + this.model.get("num_rounds"));
  }
});
