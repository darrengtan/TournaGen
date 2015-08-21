TournaGen.Views.TournamentFeedView = Backbone.CompositeView.extend({
  template: JST["tournaments/feed_index"],

  initialize: function (options) {
    this.follows = options.follows;
    this.hosts = options.hosts;
    this.listenTo(this.follows, "sync", this.render);
    this.listenTo(this.follows, "add", this.addFollowIndexItemSubview);
    this.listenTo(this.follows, "remove", this.removeFollowIndexItemSubview);
    this.listenTo(this.hosts, "sync", this.render);
    this.listenTo(this.hosts, "add", this.addHostIndexItemSubview);
    this.listenTo(this.hosts, "remove", this.removeHostIndexItemSubview);
  },

  addFollowIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.follow-tournaments-index", view);
  },

  addHostIndexItemSubview: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.host-tournaments-index", view);
  },

  removeFollowIndexItemSubview: function (tournament) {
    this.removeModelSubview("ul.follow-tournaments-index", tournament);
  },

  removeHostIndexItemSubview: function (tournament) {
    this.removeModelSubview("ul.host-tournaments-index", tournament);
  },

  render: function () {
    this.$el.html(this.template());
    if (this.hosts.fetching || this.follows.fetching) {
      this.$el.html(JST["loading_spinner"]());
      this.hosts.fetching = false;
      this.follows.fetching = false;
      return this;
    }
    this.renderTournaments();
    return this;
  },

  renderTournaments: function () {
    var noViews = $("<li>");
    noViews.addClass("list-group-item").html("None");
    if (this.follows.length === 0) {
      this.$('ul.follow-tournaments-index').html(noViews);
    } else {
      this.follows.each(this.addFollowIndexItemSubview.bind(this));
    }

    if (this.hosts.length === 0) {
      this.$('ul.host-tournaments-index').html(noViews);
    } else {
      this.hosts.each(this.addHostIndexItemSubview.bind(this));
    }
  }
});
