TournaGen.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST["teams/index_item"],
  className: "teams-index-item list-group-item",
  tagName: "li",
  attributes: function () {
    return { "data-id": this.model.escape("id") };
  },

  render: function () {
    debugger;
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
