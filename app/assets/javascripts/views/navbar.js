TournaGen.Views.Navbar = Backbone.View.extend({
  template: JST["navbar"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
