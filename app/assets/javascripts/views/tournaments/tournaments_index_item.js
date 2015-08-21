TournaGen.Views.TournamentsIndexItem = Backbone.View.extend({
  template: JST["tournaments/index_item"],
  className: "tournaments-index-item list-group-item",
  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    return this;
  }
});
