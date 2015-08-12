window.TournaGen = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $("div#main-content");
    var $leftSidebar = $("div#left-sidebar");
    var collection = new TournaGen.Collections.Tournaments();
    new TournaGen.Routers.Router({
      $rootEl: $rootEl,
      $leftSidebar: $leftSidebar,
      collection: collection
    });

    var $navbar = $("div#navbar");
    var navbarView = new TournaGen.Views.Navbar({});
    $navbar.html(navbarView.render().$el);

    Backbone.history.start();
  }
};
