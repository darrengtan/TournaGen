TournaGen.Views.TournamentFeedView = Backbone.CompositeView.extend({
  template: JST["tournaments/feed_index"],

  initialize: function (options) {
    this.follows = options.follows;
    this.hosts = options.hosts;
    this.listenTo(this.follows, "sync", this.render);
    this.listenTo(this.follows, "add", this.addFollowIndexItemSubview);
    this.listenTo(this.hosts, "sync", this.render);
    this.listenTo(this.hosts, "add", this.addFollowIndexItemSubview);
  },

  addFollowIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.follow-tournaments-index", view);
  },

  addHostIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.host-tournaments-index", view);
  },

  render: function () {
    this.$el.html(this.template());
    this.renderTournaments();
    return this;
  },

  renderTournaments: function () {
    this.follows.each(this.addFollowIndexItemSubview.bind(this));
    this.hosts.each(this.addHostIndexItemSubview.bind(this));
  }
});
