TournaGen.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  initialize: function (options) {
    this.tournaments = options.tournaments;
    this.router = options.router;
    this.listenTo(this.router, "route", this.handleRoute);
  },

  events: {
    "click .log-out": "logOut",
    "submit form": "search"
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  logOut: function (e) {
    e.preventDefault();
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location = "/session/new";
      }
    });
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  search: function (e) {
    e.preventDefault();
    var search = this.$("input.form-control").val();
    this.tournaments.fetch({ data: { search: "%" + search + "%" }});
  }
});
