TournaGen.Views.CarouselItem = Backbone.View.extend({
  template: JST["tournaments/carousel_item"],
  className: "item",

  initialize: function () {
    this.listenTo(this.model, "add remove", this.viewBracket);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    return this;
  }
});
