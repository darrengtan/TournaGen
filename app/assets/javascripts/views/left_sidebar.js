TournaGen.Views.LeftSidebar = Backbone.View.extend({
  template: JST["left_sidebar"],

  events: {
    "click .tournament-form": "createTournament"
  },

  createTournament: function (e) {
    e.preventDefault();
    var tournament = new TournaGen.Models.Tournament();
    modal = new TournaGen.Views.TournamentForm({
      model: tournament,
      collection: this.collection
    });
    $('body').append(modal.$el);
    modal.render();
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  }
});
