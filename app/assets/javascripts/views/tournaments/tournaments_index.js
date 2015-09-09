TournaGen.Views.TournamentsIndex = Backbone.CompositeView.extend({
  template: JST["tournaments/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemSubview);
    this.listenTo(this.collection, "remove", this.removeIndexItemSubview);
    this.collection.each(this.addIndexItemSubview.bind(this));
    this.listenForScroll();
  },

  addIndexItemSubview: function (tournament) {
    tournament.fetch();
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-index", view);
  },

  // show more tournaments upon scrolling to the bottom of page
  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.fetchMoreTournaments.bind(this), 500);
    $(window).on("scroll", throttledCallback);
  },

  fetchMoreTournaments: function (e) {
    if ($(window).scrollTop() === $(document).height() - $(window).height()) {
      if (this.collection.page_number < this.collection.total_pages) {
        this.collection.fetch({
          data: { page: this.collection.page_number + 1 },
          remove: false,
          success: function () {
            this.render();
          }.bind(this)
        });
      }
    }
  },

  removeIndexItemSubview: function (tournament) {
    this.removeModelSubview("ul.tournaments-index", tournament);
  },

  render: function () {
    this.$el.html(this.template({ tournaments: this.collection }));
    // show loading spinner while fetching
    if (this.collection.fetching) {
      this.$(".tournaments-index").html(JST["loading_spinner"]());
      this.collection.fetching = false;
      return this;
    }
    this.attachSubviews();
    return this;
  }
});
