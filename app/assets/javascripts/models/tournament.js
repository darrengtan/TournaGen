TournaGen.Models.Tournament = Backbone.Model.extend({
  urlRoot: "api/tournaments",

  parse: function (response) {
    if (response.teams) {
      this.teams().set(response.teams, { parse: true });
      delete response.teams;
    }

    return response;
  },

  teams: function () {
    if (!this._teams) {
      this._teams = new TournaGen.Collections.Teams([], { tournament: this });
    }

    return this._teams;
  }
});
