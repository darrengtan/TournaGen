TournaGen.Views.TournamentForm = Backbone.View.extend({
  template: JST["tournaments/form"],

  initialize: function () {
    $(document).keyup(this.handleKey.bind(this));
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
    // set model attrs to form values
    var attrs = $(e.currentTarget).serializeJSON().tournament;
    this.model.set(attrs);
    this.model.save({}, {
      success: function () {
        // navigate to tournament show on success
        this.collection.add(this.model, { merge: true });
        Backbone.history.navigate("tournaments/" + this.model.escape("id"), { trigger: true });
        this.remove();
      }.bind(this),

      error: function (tournament, error) {
        // fetch to regrab proper values
        tournament.fetch();
        // show an errors list
        var $errorsList = $("<ul>");
        error.responseJSON.forEach(function (error) {
          var $errorItem = $("<li>");
          $errorItem.html(error);
          $errorsList.append($errorItem);
        });

        this.$(".errors").removeClass("empty").html($errorsList);
      }.bind(this)
    });
  }
});
