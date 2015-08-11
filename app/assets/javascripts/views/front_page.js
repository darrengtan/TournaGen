TournaGen.Views.FrontPage = Backbone.View.extend({
  template: JST["front_page"],

  events: {
    "click a": "viewTournaments"
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  viewTournaments: function (e) {
    e.preventDefault();
    Backbone.history.navigate("tournaments", { trigger: true });
  }
});
