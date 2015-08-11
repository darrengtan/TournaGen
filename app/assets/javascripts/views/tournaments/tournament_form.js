TournaGen.Views.TournamentForm = Backbone.View.extend({
  template: JST["tournaments/form"],

  events: {
    "submit form.tournament-form": "submit"
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
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
      }.bind(this)
    });
  }
});
