TournaGen.Views.LeftSidebar = Backbone.View.extend({
  template: JST["left_sidebar"],

  initialize: function (options) {
    this.teams = options.teams;
    this.tournaments = options.tournaments;
  },

  events: {
    "click .tournament-form": "createTournament",
    "click .team-form": "createTeam"
  },

  createTeam: function (e) {
    e.preventDefault();
    var team = new TournaGen.Models.Team();
    var modal = new TournaGen.Views.TeamForm({
      model: team,
      collection: this.teams
    });
    $('body').append(modal.$el);
    modal.render();
  },

  createTournament: function (e) {
    e.preventDefault();
    var tournament = new TournaGen.Models.Tournament();
    var modal = new TournaGen.Views.TournamentForm({
      model: tournament,
      collection: this.tournaments
    });
    $('body').append(modal.$el);
    modal.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
