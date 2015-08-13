TournaGen.Models.Tournament = Backbone.Model.extend({
  urlRoot: "api/tournaments",

  parse: function (response) {
    if (response.registrations) {
      this.registrations().set(response.registrations, { parse: true });
      delete response.registrations;
    }

    return response;
  },

  registrations: function () {
    if (!this._registrations) {
      this._registrations = new TournaGen.Collections.Registrations([], { tournament: this });
    }

    return this._registrations;
  }
});
