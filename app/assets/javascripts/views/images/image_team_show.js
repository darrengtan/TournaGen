TournaGen.Views.ImageTeamShow = Backbone.View.extend({
  template: JST["images/team_show"],
  tagName: "li",
  className: "list-group-item",

  render: function () {
    this.$el.html(this.template({ image: this.model }));
    return this;
  }
});
