TournaGen.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$leftSidebar = options.$leftSidebar;
    this.tournaments = options.tournaments;
    this.teams = options.teams;
    this.root();
  },

  routes: {
    "": "root",
    "tournaments": "tournamentsIndex",
    // "tournaments/new": "tournamentsNew",
    "tournaments/:id": "tournamentShow",
    "teams": "teamsIndex",
    "teams/new": "teamsNew",
    "teams/:id": "teamShow"
  },

  root: function () {
    var view = new TournaGen.Views.LeftSidebar({
      collection: this.tournaments
    });
    this.$leftSidebar.html(view.render().$el);
    this._currentView && this._currentView.remove();
    this._currentView = null;
  },

  teamsIndex: function () {
    this.teams.fetch();
    var view = new TournaGen.Views.TeamsIndex({ collection: this.teams });
    this._swapView(view);
  },

  teamsNew: function () {

  },

  teamShow: function (id) {
    var team = this.teams.getOrFetch(id);
    var view = new TournaGen.Views.TeamShow({ model: team });
    this._swapView(view);
  },

  tournamentsIndex: function () {
    this.tournaments.fetch();
    var view = new TournaGen.Views.TournamentsIndex({ collection: this.tournaments });
    this._swapView(view);
  },
  //
  // tournamentsNew: function () {
  //   var tournament = new TournaGen.Models.Tournament();
  //   var view = new TournaGen.Views.TournamentForm({
  //     model: tournament,
  //     collection: this.tournaments
  //   });
  //
  //   this._swapView(view);
  // },

  tournamentShow: function (id) {
    var tournament = this.tournaments.getOrFetch(id);
    var view = new TournaGen.Views.TournamentShow({ model: tournament });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
