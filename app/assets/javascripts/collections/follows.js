TournaGen.Collections.Follows = Backbone.Collection.extend({
  url: "api/follows",
  model: TournaGen.Models.Follow,

  getOrFetch: function (id) {
    var follow = this.get(id);
    if (!follow) {
      follow = new TournaGen.Models.Follow({ id: id });
      this.add(follow);
      follow.fetch({
        error: function () {
          this.remove(follow);
        }.bind(this)
      });
    } else {
      follow.fetch();
    }

    return follow;
  }
});
