TournaGen.Views.TournamentForm = Backbone.View.extend({
  template: JST["tournaments/form"],

  initialize: function () {
    $(document).keyup(this.handleKey.bind(this));
    debugger;
  },

  events: {
    "submit form": "submit",
    "click .close": "removeModal",
    "click .modal-background": "remove"
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  onRender: function () {
    this.$('.title-field').focus();
  },

  removeModal: function (e) {
    e.preventDefault();
    this.remove();
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.onRender();
    return this;
  },

  submit: function (e) {
    e.preventDefault();
    var attrs = $(e.currentTarget).serializeJSON().tournament;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("tournaments/" + this.model.escape("id"), { trigger: true });
        this.remove();
      }.bind(this)
    });
  }
});
