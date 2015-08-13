TournaGen.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST["teams/show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    return this;
  }
});
