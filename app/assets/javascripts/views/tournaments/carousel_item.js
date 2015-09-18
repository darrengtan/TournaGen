TournaGen.Views.CarouselItem = Backbone.View.extend({
  template: JST["tournaments/carousel_item"],
  className: "item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.viewBracket();
    return this;
  },

  viewBracket: function () {
    this.$('#bracket-container .bracket-body').empty();
    var data = {
      teams : this.model.get("seeds"),
      results : JSON.parse(this.model.get("results"))
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data
    });

    this.$('.jQBracket').addClass("total-" + this.model.get("num_rounds"));
  }
});
