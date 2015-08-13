TournaGen.Views.TeamShow = Backbone.View.extend({
  template: JST["teams/show"],
  tagName: "li",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
