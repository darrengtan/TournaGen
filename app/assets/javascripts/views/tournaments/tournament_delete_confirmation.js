TournaGen.Views.TournamentDeleteConfirmation = Backbone.View.extend({
  template: JST["delete_confirmation"],

  initialize: function () {
    $(document).keyup(this.handleKey.bind(this));
  },

  events: {
    "click .yes-button": "deleteTournament",
    // events to exit out of modal
    "click .no-button": "removeModal",
    "click .modal-background": "remove",
    "click .close": "removeModal"
  },

  deleteTournament: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        Backbone.history.navigate("", { trigger: true });
      }.bind(this)
    });
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.remove();
    }
  },

  removeModal: function (e) {
    this.remove();
  },

  render: function () {
    this.$el.html(this.template());
  }
});
