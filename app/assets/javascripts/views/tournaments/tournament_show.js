TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function () {
    this.collection = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTeamName);
    this.listenTo(this.collection, "remove", this.removeTeamName);
    this.renderTeams();
  },

  events: {
    "click .register-button": "teamAction"
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.attachSubviews();
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeamName.bind(this));
  },

  addTeamName: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationShow({ model: registration });
    this.addSubview("ul.teams-index", view);
  },

  removeTeamName: function (registration) {
    this.removeModelSubview("ul.teams-index", registration);
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
      success: function (regist) {
        this.collection.add(regist);
        $(".register-button").html("Unregister");
        this.model.set("registered", true);
        this.model.set("registrationId", regist.get("id"));
      }.bind(this)
    });
  },

  unregisterTeam: function () {
    // var registration = this.collection.getOrFetch(this.model.get("registrationId"));
    // var registration = new TournaGen.Models.Registration({
      // id: this.model.get("registrationId")
    // });
    var registration = this.collection.findWhere({'team_id': TournaGen.CURRENT_USER.teamId });

    registration.destroy({
      success: function (model) {
        this.collection.remove(registration);
        $(".register-button").html("Register");
        this.model.set("registered", false);
      }.bind(this)
    });
  }
});
