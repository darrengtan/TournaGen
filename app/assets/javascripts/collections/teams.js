TournaGen.Collections.Teams = Backbone.Collection.extend({
  url: "api/teams",
  model: TournaGen.Models.Team,

  comparator: "name",

  parse: function (response) { // parse page number to only show a subselection
    this.page_number = parseInt(response.page_number);
    this.total_pages = parseInt(response.total_pages);
    return response.models;
  },

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

  collectionFetchListen: function () { // listen to collection fetch event
    this.on("fetch", function () {
      this.fetching = true;
    }.bind(this));
  },

  teamFetchListen: function (team) { // listen to model fetch event
    team.listenTo(team, "fetch", function () {
      this.fetching = true;
    }.bind(team));
  }
});
