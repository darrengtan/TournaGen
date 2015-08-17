TournaGen.Collections.Tournaments = Backbone.Collection.extend({
  url: "api/tournaments",
  model: TournaGen.Models.Tournament,

  comparator: "title",

  getOrFetch: function (id) {
    var tournament = this.get(id);
    if (!tournament) {
      tournament = new TournaGen.Models.Tournament({ id: id });
      this.add(tournament);
      tournament.fetch({
        error: function () {
          this.remove(tournament);
        }.bind(this)
      });
    } else {
      tournament.fetch();
    }

    return tournament;
  }
});
