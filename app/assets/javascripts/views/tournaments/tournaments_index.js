TournaGen.Views.TournamentsIndex = Backbone.CompositeView.extend({
  template: JST["tournaments/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemSubview);
    this.listenTo(this.collection, "remove", this.removeIndexItemSubview);
    this.renderTournaments();
  },

  addIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-index", view);
  },

  removeIndexItemSubview: function (tournament) {
    this.removeModelSubview("ul.tournaments-index", tournament);
  },

  render: function () {
    this.$el.html(this.template({ tournaments: this.collection }));
    if (this.collection.fetching) {
      this.$el.html(JST["loading_spinner"]());
      this.collection.fetching = false;
      return this;
    }
    this.attachSubviews();
    return this;
  },

  renderTournaments: function () {
    this.collection.each(this.addIndexItemSubview.bind(this));
  }
});
