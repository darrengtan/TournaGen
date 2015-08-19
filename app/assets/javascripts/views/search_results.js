TournaGen.Views.SearchResults = Backbone.CompositeView.extend({
  template: JST["search_results"],

  initialize: function (options) {
    this.params = options.params;
    this.teams = options.teams;
    this.tournaments = options.tournaments;
    this.listenTo(this.teams, "sync add", this.render);
    this.listenTo(this.tournaments, "sync add", this.render);
  },

  render: function () {
    this.$el.html(this.template({ params: this.params }));
    this.renderResults();
    return this;
  },

  renderResults: function () {
    var noViews = $("<li>");
    noViews.addClass("list-group-item").html("None");

    if (this.teams.length === 0) {
      this.$('ul.teams-index').html(noViews);
    } else {
      this.teams.each(this.addTeamName.bind(this));
    }

    if (this.tournaments.length === 0) {
      this.$('ul.tournaments-index').html(noViews);
    } else {
      this.tournaments.each(this.addTournamentTitle.bind(this));
    }
  },

  addTeamName: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  addTournamentTitle: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-index", view);
  }
});
