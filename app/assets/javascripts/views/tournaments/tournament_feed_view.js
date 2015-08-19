TournaGen.Views.TournamentFeedView = Backbone.CompositeView.extend({
  template: JST["tournaments/feed_index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  addIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-index", view);
  },

  render: function () {
    this.$el.html(this.template());
    this.renderTournaments();
    return this;
  },

  renderTournaments: function () {
    this.collection.each(this.addIndexItemSubview.bind(this));
  }
});
