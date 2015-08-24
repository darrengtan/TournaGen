TournaGen.Views.TournamentFeedView = Backbone.CompositeView.extend({
  template: JST["tournaments/feed_index"],

  attributes: {
    "data-step": "3",
    "data-intro": "This is your feed, which consists of tournaments you're following and hosting. If you want to check a tournament's progress, click the arrow next to the name. If you want more detailed information on a tournament, click the tournament title.",
    "data-position": "left"
  },

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
    var noViews1 = $("<li>");
    noViews1.addClass("list-group-item").html("None");
    var noViews2 = $("<li>");
    noViews2.addClass("list-group-item").html("None");
    if (this.follows.length === 0) {
      this.$('ul.follow-tournaments-index').html(noViews1);
    } else {
      this.follows.each(this.addFollowIndexItemSubview.bind(this));
    }

    if (this.hosts.length === 0) {
      this.$('ul.host-tournaments-index').html(noViews2);
    } else {
      this.hosts.each(this.addHostIndexItemSubview.bind(this));
    }
  }
});
