window.TournaGen = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("div#main-content");
    var $leftSidebar = $("div#left-sidebar");
    var tournaments = new TournaGen.Collections.Tournaments();
    var teams = new TournaGen.Collections.Teams();
    new TournaGen.Routers.Router({
      $rootEl: $rootEl,
      $leftSidebar: $leftSidebar,
      tournaments: tournaments,
      teams: teams
    });

    var $navbar = $("div#navbar");
    var navbarView = new TournaGen.Views.Navbar({});
    $navbar.html(navbarView.render().$el);

    Backbone.history.start();
  }
};