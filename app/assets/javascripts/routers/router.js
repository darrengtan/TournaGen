TournaGen.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$leftSidebar = options.$leftSidebar;
    this.tournaments = options.tournaments;
    this.teams = options.teams;
    this.followTournaments = new TournaGen.Collections.Tournaments();
    this.hostTournaments = new TournaGen.Collections.Tournaments();
    this.root();

    var view = new TournaGen.Views.LeftSidebar({
      tournaments: this.tournaments,
      teams: this.teams
    });
    this.$leftSidebar.html(view.render().$el);
  },

  routes: {
    "": "root",
    "search": "search",
    "tournaments": "tournamentsIndex",
    "tournaments/:id": "tournamentShow",
    "teams": "teamsIndex",
    "teams/new": "teamsNew",
    "teams/:id": "teamShow"
  },

  search: function () {
    var view = new TournaGen.Views.SearchResults({
      teams: this.teams,
      tournaments: this.tournaments
    });

    this._swapView(view);
  },

  root: function () {
    this.followTournaments.fetch({ data: { type: "follow" }});
    this.hostTournaments.fetch({ data: { type: "host" }});
    var view = new TournaGen.Views.TournamentFeedView({
      follows: this.followTournaments,
      hosts: this.hostTournaments
    });

    this._swapView(view);
  },

  teamsIndex: function () {
    this.teams.fetch();
    var view = new TournaGen.Views.TeamsIndex({ collection: this.teams });
    this._swapView(view);
  },

  teamShow: function (id) {
    this.teams.fetch();
    var team = this.teams.getOrFetch(id);
    var view = new TournaGen.Views.TeamShow({
      model: team,
      teams: this.teams
    });
    this._swapView(view);
  },

  tournamentsIndex: function () {
    this.tournaments.fetch();
    var view = new TournaGen.Views.TournamentsIndex({ collection: this.tournaments });
    this._swapView(view);
  },

  tournamentShow: function (id) {
    this.tournaments.fetch();
    var tournament = this.tournaments.getOrFetch(id);
    var view = new TournaGen.Views.TournamentShow({
      model: tournament,
      tournaments: this.tournaments
    });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
