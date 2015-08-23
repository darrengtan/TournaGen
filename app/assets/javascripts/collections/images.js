TournaGen.Collections.Images = Backbone.Collection.extend({
  url: "api/images",
  model: TournaGen.Models.Image,

  getOrFetch: function (id) {
    var image = this.get(id);
    if (!image) {
      image = new TournaGen.Models.Image({ id: id });
      this.add(image);
      image.fetch({
        error: function () {
          this.remove(image);
        }.bind(this)
      });
    } else {
      image.fetch();
    }

    return image;
  }
});
