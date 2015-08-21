TournaGen.Views.TournamentsSearchItem = Backbone.View.extend({
  template: JST["tournaments/search"],
  className: "tournaments-results-item list-group-item",
  tagName: "li",

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    return this;
  }
});
