TournaGen.Views.FrontPage = Backbone.View.extend({
  template: JST["front_page"],

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
