TournaGen.Views.CarouselItem = Backbone.View.extend({
  template: JST["tournaments/carousel_item"],
  className: "item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.viewBracket);
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
      results : this.model.get("results")
    };

    this.$('#bracket-container .bracket-body').bracket({
      init: data
    });

    this.$('.jQBracket').addClass("total-" + this.model.get("numRounds"));
  }
});
