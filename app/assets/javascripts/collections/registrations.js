TournaGen.Collections.Registrations = Backbone.Collection.extend({
  url: "api/registrations",
  model: TournaGen.Models.Registration,

  getOrFetch: function (id) {
    var registration = this.get(id);
    if (!registration) {
      registration = new TournaGen.Models.Registration({ id: id });
      this.add(registration);
      registration.fetch({
        error: function () {
          this.remove(registration);
        }.bind(this)
      });
    } else {
      registration.fetch();
    }

    return registration;
  }
});
