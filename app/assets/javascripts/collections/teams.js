TournaGen.Collections.Teams = Backbone.Collection.extend({
  url: "api/teams",
  model: TournaGen.Models.Team,

  comparator: "name",

  getOrFetch: function (id) {
    var team = this.get(id);
    if (!team) {
      team = new TournaGen.Models.Team({ id: id });
      this.teamFetchListen(team);
      this.add(team);
      team.fetch({
        error: function () {
          this.remove(team);
        }.bind(this)
      });
    } else {
      this.teamFetchListen(team);
      team.fetch();
    }

    return team;
  },

  collectionFetchListen: function () {
    this.on("fetch", function () {
      this.fetching = true;
    }.bind(this));
  },

  teamFetchListen: function (team) {
    team.listenTo(team, "fetch", function () {
      this.fetching = true;
    }.bind(team));
  }
});
