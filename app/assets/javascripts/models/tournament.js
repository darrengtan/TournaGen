TournaGen.Models.Tournament = Backbone.Model.extend({
  urlRoot: "api/tournaments",

  parse: function (response) {
    if (response.follows) {
      this.follows().set(response.follows, { parse: true });
      delete response.follows;
    }

    if (response.registrations) {
      this.registrations().set(response.registrations, { parse: true });
      delete response.registrations;
    }

    return response;
  },

  follows: function () {
    if (!this._follows) {
      this._follows = new TournaGen.Collections.Follows([], { tournament: this });
    }

    return this._follows;
  },

  registrations: function () {
    if (!this._registrations) {
      this._registrations = new TournaGen.Collections.Registrations([], { tournament: this });
    }

    return this._registrations;
  }
});
