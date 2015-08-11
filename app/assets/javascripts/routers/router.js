TournaGen.Routers.Router = Backbone.Router.extend({
  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.$leftSidebar = options.$leftSidebar;
    this.collection = options.collection;
    this.root();
  },

  routes: {
    "": "root",
    "tournaments": "tournamentsIndex",
    "tournaments/new": "tournamentsNew",
    "tournaments/:id": "tournamentShow"
  },

  root: function () {
    this._currentView && this._currentView.remove();
    this._currentView = null;
  },

  tournamentsIndex: function () {
    this.collection.fetch();
    var view = new TournaGen.Views.TournamentsIndex({ collection: this.collection });
    this._swapView(view);
  },

  tournamentsNew: function () {

  },

  tournamentShow: function (id) {
    var tournament = this.collection.getOrFetch(id);
    var view = new TournaGen.Views.TournamentShow({ model: tournament });
    this._swapView(view);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el);
  }
});
