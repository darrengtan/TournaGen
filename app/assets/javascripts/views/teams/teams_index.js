TournaGen.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST["teams/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemSubview);
    this.listenTo(this.collection, "remove", this.removeIndexItemSubview);
    this.collection.each(this.addIndexItemSubview.bind(this));
    this.listenForScroll();
  },

  addIndexItemSubview: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  listenForScroll: function () {
    $(window).off("scroll");
    var throttledCallback = _.throttle(this.fetchMoreTeams.bind(this), 500);
    $(window).on("scroll", throttledCallback);
  },

  fetchMoreTeams: function (e) {
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
