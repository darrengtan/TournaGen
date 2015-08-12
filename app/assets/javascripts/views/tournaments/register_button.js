TournaGen.Views.RegisterButton = Backbone.View.extend({
  template: JST["tournaments/register_button"],

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    return this;
  }
});
