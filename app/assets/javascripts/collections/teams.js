TournaGen.Collections.Teams = Backbone.Collection.extend({
  url: "api/teams",
  model: TournaGen.Models.Team,

  comparator: "name",

  getOrFetch: function (id) {
    var team = this.get(id);
    if (!team) {
      team = new TournaGen.Models.Team({ id: id });
      this.add(team);
      team.fetch({
        error: function () {
          this.remove(team);
        }.bind(this)
      });
    } else {
      team.fetch();
    }

    return team;
  }
});
