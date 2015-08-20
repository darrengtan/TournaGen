TournaGen.Views.ImageTeamShow = Backbone.View.extend({
  template: JST["images/team_show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ image: this.model }));
    return this;
  }
});
