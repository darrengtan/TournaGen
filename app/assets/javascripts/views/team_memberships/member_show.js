TournaGen.Views.MemberShow = Backbone.View.extend({
  template: JST["team_memberships/member_show"],
  tagName: "li",
  className: "list-group-item",

  initialize: function () {
    // update team member list on sync
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ teamMembership: this.model }));
    return this;
  }
});
