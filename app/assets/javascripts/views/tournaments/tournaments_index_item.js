TournaGen.Views.TournamentsIndexItem = Backbone.View.extend({
  template: JST["tournaments/index_item"],
  className: "tournaments-index-item list-group-item",
  tagName: "li",
  attributes: function () {
    return { "data-id": this.model.escape("id") };
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    return this;
  }
});
