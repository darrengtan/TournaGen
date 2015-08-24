TournaGen.Views.LeftSidebar = Backbone.View.extend({
  template: JST["left_sidebar"],

  attributes: {
    "data-step": "2",
    "data-position": "right",
    "data-intro": "This is the sidebar, where you can navigate through the app, create tournaments, and make your own team. Try out these options!"
  },

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
