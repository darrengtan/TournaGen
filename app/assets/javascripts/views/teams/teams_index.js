TournaGen.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST["teams/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemSubview);
    this.listenTo(this.collection, "remove", this.removeIndexItemSubview);
    this.collection.each(this.addIndexItemSubview.bind(this));
  },

  addIndexItemSubview: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  removeIndexItemSubview: function (team) {
    this.removeModelSubview("ul.teams-index", team);
  },

  render: function () {
    this.$el.html(this.template({ teams: this.collection }));
    if (this.collection.fetching) {
      this.$("ul.teams-index").html(JST["loading_spinner"]());
      this.collection.fetching = false;
      return this;
    }
    this.attachSubviews();
    return this;
  }
});
