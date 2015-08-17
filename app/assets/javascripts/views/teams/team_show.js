TournaGen.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST["teams/show"],

  initialize: function (options) {
    this.teams = options.teams;
    this.collection = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTournamentTitle);
    this.listenTo(this.collection, "remove", this.removeTournamentTitle);
    this.renderTournaments();
  },

  events: {
    "click .edit-button": "editTeam"
  },

  editTeam: function (e) {
    e.preventDefault();
    var modal = new TournaGen.Views.TeamForm({
      model: this.model,
      collection: this.teams
    });

    $('body').append(modal.$el);
    modal.render();
  },

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    this.attachSubviews();
    return this;
  },

  renderTournaments: function () {
    this.collection.each(this.addTournamentTitle.bind(this));
  },

  addTournamentTitle: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationTournamentShow({ model: registration });
    this.addSubview("ul.tournaments-index", view);
  },

  removeTournamentTitle: function (registration) {
    this.removeModelSubview("ul.tournaments-index", registration);
  }
});
