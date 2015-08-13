TournaGen.Views.RegistrationShow = Backbone.View.extend({
  template: JST["registrations/show"],
  tagName: "li",
  className: "list-group-item",

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ registration: this.model }));
    return this;
  }
});
