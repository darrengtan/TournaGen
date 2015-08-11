TournaGen.Views.TournamentsIndex = Backbone.CompositeView.extend({
  template: JST["tournaments/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  events: {
    "click li.tournaments-index-item": "showTournament"
  },

  addIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-index", view);
  },

  render: function () {
    this.$el.html(this.template({ tournaments: this.collection }));
    this.renderTournaments();
    return this;
  },

  renderTournaments: function () {
    this.collection.each(this.addIndexItemSubview.bind(this));
  },

  showTournament: function (e) {
    e.preventDefault();
    var tournamentId = $(e.currentTarget).data("id");
    Backbone.history.navigate("tournaments/" + tournamentId, { trigger: true });
  }
});
