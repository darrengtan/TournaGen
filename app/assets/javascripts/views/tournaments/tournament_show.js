TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function () {
    this.collection = this.model.teams();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTeam);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.renderTeams();
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeam.bind(this));
  },

  addTeam: function (team) {
    var view = new TournaGen.Views.TeamShow({ model: team });
    this.addSubview("ul.teams-index", view);
  }
});
