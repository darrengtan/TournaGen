TournaGen.Views.TeamsIndex = Backbone.CompositeView.extend({
  template: JST["teams/index"],

  initialize: function () {
    this.listenTo(this.collection, "sync add", this.render);
  },

  events: {
    "click li.teams-index-item": "showTeam"
  },

  addIndexItemSubview: function (team) {
    var view = new TournaGen.Views.TeamsIndexItem({ model: team });
    this.addSubview("ul.teams-index", view);
  },

  render: function () {
    this.$el.html(this.template({ teams: this.collection }));
    this.renderTeams();
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addIndexItemSubview.bind(this));
  },

  showTeam: function (e) {
    e.preventDefault();
    var teamId = $(e.currentTarget).data("id");
    Backbone.history.navigate("teams/" + teamId, { trigger: true });
  }
});
