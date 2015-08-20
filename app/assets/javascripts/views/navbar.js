TournaGen.Views.Navbar = Backbone.CompositeView.extend({
  template: JST["navbar"],

  initialize: function (options) {
    this.teams = options.teams;
    this.tournaments = options.tournaments;
    this.router = options.router;
    this.listenTo(this.router, "route", this.handleRoute);
    this.listenTo(this.teams, "sync", this.renderResults);
    this.listenTo(this.tournaments, "sync", this.renderResults);
  },

  events: {
    "click .log-out": "logOut",
    "input input[type=text]": "search"
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
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
    this.eachSubview(function (subview) { subview.remove(); });
    if (this.teams.length === 0 && this.tournaments.length === 0) {
      this.$('.empty').removeClass("empty").addClass("empty");
    } else {
      // if (this.teams.length !== 0) {
      //   this.$('.teams-results').removeClass("empty");
      //   this.teams.each(this.addTeamName.bind(this));
      // } else {
      //   debugger;
      //   this.$('.teams-results').addClass("empty");
      // }
      //
      // if (this.tournaments.length !== 0) {
      //   this.$('.tournaments-results').removeClass("empty");
      //   this.tournaments.each(this.addTournamentTitle.bind(this));
      // } else {
      //   debugger;
      //   this.$('.tournaments-results').addClass("empty");
      // }

      this.$('.teams-results').removeClass("empty");
      this.teams.each(this.addTeamName.bind(this));
      this.$('.tournaments-results').removeClass("empty");
      this.tournaments.each(this.addTournamentTitle.bind(this));
    }
  },

  addTeamName: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-results", view);
  },

  addTournamentTitle: function (tournament) {
    var view = new TournaGen.Views.TournamentsIndexItem({ model: tournament });
    this.addSubview("ul.tournaments-results", view);
  },

  search: function (e) {
    e.preventDefault();
    var search = this.$("input.form-control").val();
    if (search !== "") {
      this.teams.fetch({ data: { search: search }});
      this.tournaments.fetch({ data: { search: search }});
      this.renderResults();
    } else {
      this.eachSubview(function (subview) { subview.remove(); });
    }
  }
});
