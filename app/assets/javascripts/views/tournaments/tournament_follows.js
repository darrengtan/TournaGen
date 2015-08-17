TournaGen.Views.TournamentFollows = Backbone.View.extend({
  template: JST["follows/num_follows"],

  initialize: function () {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  events: {
    "click .follow-button": "followAction"
  },

  followAction: function (e) {
    e.preventDefault();
    if (this.model.get("following")) {
      this.unfollowTournament();
    } else {
      this.followTournament();
    }
  },

  followTournament: function () {
    var follow = new TournaGen.Models.Follow({ tournament_id: this.model.get("id") });
    follow.save({}, {
      success: function (foll) {
        this.collection.add(foll);
        this.$(".follow-button").html("Unfollow");
        this.model.set("following", true);
        this.model.set("followId", foll.get("id"));
      }.bind(this)
    });
  },

  unfollowTournament: function () {
    var follow = this.collection.findWhere({ "id": this.model.get("followId" )});
    follow.destroy({
      success: function () {
        this.collection.remove(follow);
        $(".follow-button").html("Follow");
        this.model.set("following", false);
      }.bind(this)
    });
  },

  render: function () {
    this.$el.html(this.template({
      tournament: this.model,
      follows: this.collection
    }));
    return this;
  }
});
