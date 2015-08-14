TournaGen.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  events: {
    "click .log-out": "logOut"
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
  }
});
