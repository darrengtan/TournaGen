TournaGen.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST["teams/show"],

  initialize: function (options) {
    this.teams = options.teams;
    this.registrations = this.model.registrations();
    this.teamMemberships = this.model.teamMemberships();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.registrations, "add", this.addTournamentTitle);
    this.listenTo(this.registrations, "remove", this.removeTournamentTitle);
    this.listenTo(this.teamMemberships, "add", this.addMemberName);
    this.renderTeamMembers();
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

  renderTeamMembers: function () {
    this.teamMemberships.each(this.addMemberName.bind(this));
  },

  renderTournaments: function () {
    this.registrations.each(this.addTournamentTitle.bind(this));
  },

  addMemberName: function (teamMembership) {
    teamMembership.fetch();
    var view = new TournaGen.Views.MemberShow({ model: teamMembership });
    this.addSubview("ul.team-members-index", view);
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
