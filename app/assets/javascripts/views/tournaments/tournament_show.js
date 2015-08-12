TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function () {
    this.collection = this.model.teams();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync add remove", this.render);
    // this.listenTo(this.collection, "remove", this.removeTeam);
  },

  events: {
    "click .register-button": "teamAction"
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.renderTeams();
    // this.renderRegisterButton();
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeam.bind(this));
  },

  // renderRegisterButton: function () {
  //   var view = new TournaGen.Views.RegisterButton({ model: this.model });
  //   this.addSubview("button.register-button", view);
  // },

  removeTeam: function (team) {
    this.removeModelSubview("ul.teams-index", team);
  },

  addTeam: function (team) {
    var view = new TournaGen.Views.TeamShow({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  teamAction: function (e) {
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
      success: function () {
        var team = new TournaGen.Models.Team({ id: registration.get("team_id") });
        team.fetch();
        this.collection.add(team);
      }.bind(this)
    });
  },

  unregisterTeam: function () {
    var registration = new TournaGen.Models.Registration({
      id: this.model.get("registrationId")
    });
    registration.fetch({
      success: function () {
        team = this.collection.getOrFetch(registration.get("team_id"));
        debugger;
        this.collection.remove(team);
        registration.destroy();
      }.bind(this)
    });
  }
});
