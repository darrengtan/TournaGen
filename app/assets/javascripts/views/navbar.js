TournaGen.Views.Navbar = Backbone.CompositeView.extend({
  template: JST["navbar"],

  initialize: function (options) {
    this.router = options.router;
    this.tournaments = options.tournaments;
    this.teams = options.teams;
    this.tournaments = new TournaGen.Collections.Tournaments();
    this.teams = new TournaGen.Collections.Teams();
    this.listenTo(this.router, "route", this.handleRoute);
    this.listenTo(this.teams, "sync", this.renderResults);
    this.listenTo(this.tournaments, "sync", this.renderResults);
    this.listenTo(this.teams, "add", this.addTeamName);
    this.listenTo(this.teams, "remove", this.removeTeamName);
    this.listenTo(this.tournaments, "add", this.addTournamentTitle);
    this.listenTo(this.tournaments, "remove", this.removeTournamentTitle);
    $(document).keyup(this.handleKey.bind(this));
  },

  events: {
    "click .log-out": "logOut",
    "input input[type=text]": "search",
    "click a": "hideSearch",
    "click .transparent-background": "hideSearch",
    "click .tournamentsIndex": "tournamentsIndex"
  },

  tournamentsIndex: function (e) {
    e.preventDefault();
    Backbone.history.navigate("tournaments", { trigger: true });
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.hideSearch();
    }
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  hideSearch: function () {
    this.$('.teams-results').addClass("empty");
    this.$('.tournaments-results').addClass("empty");
    this.$('input.form-control').val("");
  },

  logOut: function (e) {
    e.preventDefault();
    $.ajax({
      url: "/session",
      type: "DELETE",
      success: function () {
        window.location = "/session/new";
      }
    });
  },

  render: function () {
    this.$el.html(this.template());
    return this;
  },

  renderResults: function () {
    if (this.$('input.form-control').val() === "") {
      debugger;
      this.hideSearch();
    } else {
      if (this.teams.length !== 0) {
        this.$('.teams-results').removeClass("empty");
      } else {
        this.$('.teams-results').addClass("empty");
      }

      if (this.tournaments.length !== 0) {
        this.$('.tournaments-results').removeClass("empty");
      } else {
        this.$('.tournaments-results').addClass("empty");
      }
    }
  },

  addTeamName: function (team) {
    var view = new TournaGen.Views.TeamsSearchItem({ model: team });
    this.addSubview("ul.teams-results", view);
  },

  addTournamentTitle: function (tournament) {
    var view = new TournaGen.Views.TournamentsSearchItem({ model: tournament });
    this.addSubview("ul.tournaments-results", view);
  },

  removeTeamName: function (team) {
    this.removeModelSubview("ul.teams-results", team);
  },

  removeTournamentTitle: function (tournament) {
    this.removeModelSubview("ul.tournaments-results", tournament);
  },

  search: function (e) {
    e.preventDefault();
    var search = this.$("input.form-control").val();
    this.teams.fetch({ data: { search: search }});
    this.tournaments.fetch({ data: { search: search }});
  }
});
