TournaGen.Views.TeamsIndexItem = Backbone.View.extend({
  template: JST["teams/index_item"],
  className: "teams-index-item list-group-item",
  tagName: "li",

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
