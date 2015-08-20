TournaGen.Views.TeamShow = Backbone.CompositeView.extend({
  template: JST["teams/show"],

  initialize: function (options) {
    this.teams = options.teams;
    this.images = this.model.images();
    this.registrations = this.model.registrations();
    this.teamMemberships = this.model.teamMemberships();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.registrations, "add", this.addTournamentTitle);
    this.listenTo(this.registrations, "remove", this.removeTournamentTitle);
    this.listenTo(this.teamMemberships, "add", this.addMemberName);
    this.listenTo(this.teamMemberships, "remove", this.removeMemberName);
    this.listenTo(this.images, "add", this.addImage);
    this.listenTo(this.images, "remove", this.removeImage);
    this.renderTeamMembers();
    this.renderTournaments();
    this.renderImages();
  },

  events: {
    "click .edit-button": "editTeam",
    "click .join-button": "joinAction",
    "click .delete-button": "deleteTeam",
    "click .upload-button": "upload"
  },

  addImage: function (image) {
    image.fetch();
    var view = new TournaGen.Views.ImageTeamShow({ model: image });
    this.addSubview("ul.images-index", view);
  },

  addMemberName: function (teamMembership) {
    teamMembership.fetch();
    var view = new TournaGen.Views.MemberShow({ model: teamMembership });
    this.addSubview("ul.team-members-index", view);
  },

  addTournamentTitle: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationTournamentShow({ model: registration });
    this.addSubview("ul.tournaments-index", view);
  },

  editTeam: function (e) {
    e.preventDefault();
    var modal = new TournaGen.Views.TeamForm({
      model: this.model,
      collection: this.teams
    });

    $('body').append(modal.$el);
    modal.render();
  },

  deleteTeam: function (e) {
    e.preventDefault();
    this.model.destroy({
      success: function () {
        this.remove();
        window.location = "";
      }.bind(this)
    });
  },

  joinAction: function (e) {
    e.preventDefault();
    if (this.model.get("is_team_member")) {
      this.leaveTeam();
    } else {
      this.joinTeam();
    }
  },

  joinTeam: function () {
    var teamMembership = new TournaGen.Models.TeamMembership({ "team_id": this.model.get("id") });
    teamMembership.save({}, {
      success: function (tm) {
        this.teamMemberships.add(tm);
        this.$('.join-button').html("Leave This Team");
        this.model.set("is_team_member", true);
        this.model.set("tmId", tm.id);
      }.bind(this)
    });
  },

  leaveTeam: function () {
    var teamMembership = this.teamMemberships.findWhere({ "id": this.model.get("tmId") });
    teamMembership.destroy({
      success: function () {
        this.teamMemberships.remove(teamMembership);
        $(".join-button").html("Join This Team");
        this.model.set("is_team_member", false);
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({ team: this.model }));
    this.attachSubviews();
    return this;
  },

  renderImages: function () {
    this.images.each(this.addImage.bind(this));
  },

  renderTeamMembers: function () {
    this.teamMemberships.each(this.addMemberName.bind(this));
  },

  renderTournaments: function () {
    this.registrations.each(this.addTournamentTitle.bind(this));
  },

  removeImage: function (image) {
    this.removeModelSubview("ul.images-index", image);
  },

  removeMemberName: function (teamMembership) {
    this.removeModelSubview("ul.team-members-index", teamMembership);
  },

  removeTournamentTitle: function (registration) {
    this.removeModelSubview("ul.tournaments-index", registration);
  },

  upload: function (e) {
    e.preventDefault();
    var image = new TournaGen.Models.Image();
    cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function (error, result) {
      var data = result[0];
      image.set({
        url: data.url,
        thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/" + data.path,
        imageable_id: this.model.get("id"),
        imageable_type: "Team"
      });
      image.save({}, {
        success: function () {
          this.images.add(image);
        }.bind(this)
      });
    }.bind(this));
  }
});
