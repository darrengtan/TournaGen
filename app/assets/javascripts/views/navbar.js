TournaGen.Views.Navbar = Backbone.CompositeView.extend({
  template: JST["navbar"],

  initialize: function (options) {
    this.router = options.router;
    this.tournaments = new TournaGen.Collections.Tournaments();
    this.teams = new TournaGen.Collections.Teams();
    this.listenTo(this.router, "route", this.handleRoute);
    this.listenTo(this.teams, "sync", this.renderResults);
    this.listenTo(this.tournaments, "sync", this.renderResults);
    $(document).keyup(this.handleKey.bind(this));
  },

  events: {
    "click .log-out": "logOut",
    "input input[type=text]": "search",
    "click a": "removeSearch",
    "click .transparent-background": "removeSearch"
  },

  handleKey: function (e) {
    if (e.keyCode === 27) {
      this.eachSubview(function (subview) { subview.remove(); });
      this.hideSearch();
    }
  },

  handleRoute: function (routeName, params) {
    this.$el.find(".active").removeClass("active");
    this.$el.find("." + routeName).addClass("active");
  },

  hideSearch: function () {
    this.eachSubview(function (subview) { subview.remove(); });
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

  removeSearch: function (e) {
    this.hideSearch();
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
      if (this.teams.length !== 0) {
        this.$('.teams-results').removeClass("empty");
        this.teams.each(this.addTeamName.bind(this));
      } else {
        this.$('.teams-results').addClass("empty");
      }

      if (this.tournaments.length !== 0) {
        this.$('.tournaments-results').removeClass("empty");
        this.tournaments.each(this.addTournamentTitle.bind(this));
      } else {
        this.$('.tournaments-results').addClass("empty");
      }
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
      this.hideSearch();
    }
  }
});
