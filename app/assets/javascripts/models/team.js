TournaGen.Models.Team = Backbone.Model.extend({
  urlRoot: "api/teams",

  parse: function (response) {
    if (response.images) {
      this.images().set(response.images, { parse: true });
      delete response.images;
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

  images: function () {
    if (!this._images) {
      this._images = new TournaGen.Collections.Images([], { team: this });
    }

    return this._images;
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
