TournaGen.Views.TeamsSearchItem = Backbone.View.extend({
  template: JST["teams/search"],
  tagName: "li",
  className: "teams-results-item list-group-item",

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
