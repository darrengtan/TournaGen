TournaGen.Views.MemberShow = Backbone.View.extend({
  template: JST["team_memberships/member_show"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  tagName: "li",
  className: "list-group-item",

  render: function () {
    this.$el.html(this.template({ teamMembership: this.model }));
    return this;
  }
});
