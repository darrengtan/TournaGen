TournaGen.Views.TeamShow = Backbone.View.extend({
  template: JST["teams/show"],
  tagName: "li",

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
