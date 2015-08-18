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
    this.listenTo(this.teamMemberships, "remove", this.removeMemberName);
    this.renderTeamMembers();
    this.renderTournaments();
  },

  events: {
    "click .edit-button": "editTeam",
    "click .join-button": "joinAction",
    "click .delete-button": "deleteTeam"
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

  deleteTeam: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        Backbone.history.navigate("teams", { trigger: true });
      }.bind(this)
    });
  },

  joinAction: function (e) {
    e.preventDefault();
    if (this.model.get("is_team_member")) {
      this.leaveTeam();
    } else {
      this.joinTeam();
    }
  },

  joinTeam: function () {
    var teamMembership = new TournaGen.Models.TeamMembership({ "team_id": this.model.get("id") });
    teamMembership.save({}, {
      success: function (tm) {
        this.teamMemberships.add(tm);
        this.$('.join-button').html("Leave This Team");
        this.model.set("is_team_member", true);
        this.model.set("tmId", tm.id);
      }.bind(this)
    });
  },

  leaveTeam: function () {
    var teamMembership = this.teamMemberships.findWhere({ "id": this.model.get("tmId") });
    teamMembership.destroy({
      success: function () {
        this.teamMemberships.remove(teamMembership);
        $(".join-button").html("Join This Team");
        this.model.set("is_team_member", false);
      }.bind(this)
    });
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

  removeMemberName: function (teamMembership) {
    this.removeModelSubview("ul.team-members-index", teamMembership);
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
