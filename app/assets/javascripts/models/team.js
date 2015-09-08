TournaGen.Models.Team = Backbone.Model.extend({
  urlRoot: "api/teams",

  // parse json api to backbone collections/models
  parse: function (response) {
    if (response.image) {
      this.image().set(response.image, { parse: true });
      delete response.image;
    }

    if (response.registrations) {
      this.registrations().set(response.registrations, { parse: true });
      delete response.registrations;
    }

    if (response.team_memberships) {
      this.teamMemberships().set(response.team_memberships, { parse: true });
      delete response.team_memberships;
    }

    return response;
  },

  // create backbone model/collection for team img, regs, and tms
  image: function () {
    if (!this._image) {
      this._image = new TournaGen.Models.Image({ team: this });
    }

    return this._image;
  },

  registrations: function () {
    if (!this._registrations) {
      this._registrations = new TournaGen.Collections.Registrations([], { team: this });
    }

    return this._registrations;
  },

  teamMemberships: function () {
    if (!this._teamMemberships) {
      this._teamMemberships = new TournaGen.Collections.TeamMemberships([], { team: this });
    }

    return this._teamMemberships;
  }
});
