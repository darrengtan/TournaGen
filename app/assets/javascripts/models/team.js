TournaGen.Models.Team = Backbone.Model.extend({
  urlRoot: "api/teams",

  parse: function (response) {
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
