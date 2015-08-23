TournaGen.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST["teams/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addIndexItemSubview);
    this.listenTo(this.collection, "remove", this.removeIndexItemSubview);
    this.collection.each(this.addIndexItemSubview.bind(this));
    // this.listenForScroll();
  },

  addIndexItemSubview: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  // listenForScroll: function () {
  //   this.$el.off("scroll");
  //   var throttledCallback = _.throttle(this.nextPage.bind(this), 200);
  //   this.$el.on("scroll", throttledCallback);
  // },
  //
  // nextPage: function () {
  //   var view = this;
  //   if (this.$el.scrollTop() > $(document).height() - $(window).height() - 50) {
  //     if (view.collection.page_number < view.collection.total_pages) {
  //       view.collection.fetch({
  //         data: { page: view.collection.page_number + 1 },
  //         remove: false
  //       });
  //     }
  //   }
  // },

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
    // this.listenForScroll();
    return this;
  }
});
