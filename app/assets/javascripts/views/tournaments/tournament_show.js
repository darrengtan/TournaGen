TournaGen.Views.TournamentShow = Backbone.CompositeView.extend({
  template: JST["tournaments/show"],

  initialize: function () {
    this.collection = this.model.registrations();
    this.listenTo(this.model, "sync", this.render);
    // this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addTeamName);
    this.listenTo(this.collection, "remove", this.removeTeamName);
    this.renderTeams();
  },

  events: {
    "click .register-button": "teamAction"
  },
  saveData: function(results){
    // debugger;
    // $.ajax
    // model.set(results)
    // model.save()
  },

  testBracket: function () {
    var minimalData = {
      teams : [
        ["Team 1", "Team 2"], /* first matchup */
        ["Team 3", "Team 4"]  /* second matchup */
      ],
      results : [
        [[1,2], [3,4]]       /* first round */
        // [[4,6], [2,1]]        /* second round */
      ]
    };

    this.$('#minimal .demo').bracket({
      init: minimalData,
      save: this.saveData
    });
//
//     var saveData = {
//       teams : [
//         ["Team 1", "Team 2"], /* first matchup */
//         ["Team 3", "Team 4"]  /* second matchup */
//       ],
//       results : [[1,0], [2,7]]
//     };
//
// /* Called whenever bracket is modified
//  *
//  * data:     changed bracket object in format given to init
//  * userData: optional data given when bracket is created.
//  */
//     function saveFn(data, userData) {
//       debugger;
//       var json = jQuery.toJSON(data);
//       $('#saveOutput').text('POST '+userData+' '+json);
//       /* You probably want to do something like this
//       jQuery.ajax("rest/"+userData, {contentType: 'application/json',
//                                     dataType: 'json',
//                                     type: 'post',
//                                     data: json})
//       */
//     }
//
//     var container = this.$('div#minimal .demo');
//     container.bracket({
//       init: saveData,
//       save: saveFn,
//       userData: "http://myapi"
//     });
//
//     /* You can also inquiry the current data */
//     var data = container.bracket('data');
//     // $('#dataOutput').text(jQuery.toJSON(data));
  },

  addTeamName: function (registration) {
    registration.fetch();
    var view = new TournaGen.Views.RegistrationShow({ model: registration });
    this.addSubview("ul.teams-index", view);
  },

  checkAuthorized: function () {
    if (this.get("authorized")) {
      this.testBracket();
    } else {
      this.viewBracket();
    }
  },

  viewBracket: function () {
    var minimalData = {
      teams : [
        ["Team 1", "Team 2"], /* first matchup */
        ["Team 3", "Team 4"]  /* second matchup */
      ],
      results : [
        [[1,2], [3,4]]       /* first round */
        // [[4,6], [2,1]]        /* second round */
      ]
    };

    this.$('#minimal .demo').bracket({
      init: minimalData
    });
  },

  removeTeamName: function (registration) {
    this.removeModelSubview("ul.teams-index", registration);
  },

  render: function () {
    this.$el.html(this.template({ tournament: this.model }));
    this.attachSubviews();
    if (this.model.get("authorized")) {
      this.testBracket();
    } else {
      this.viewBracket();
    }
    return this;
  },

  renderTeams: function () {
    this.collection.each(this.addTeamName.bind(this));
  },

  registerTeam: function () {
    var registration = new TournaGen.Models.Registration({
      tournament_id: this.model.get("id")
    });
    registration.save({}, {
      success: function (regist) {
        this.collection.add(regist);
        $(".register-button").html("Unregister");
        this.model.set("registered", true);
        this.model.set("registrationId", regist.get("id"));
      }.bind(this)
    });
  },

  teamAction: function (e) {
    e.preventDefault();
    if (!this.model.get("registered")) {
      this.registerTeam();
    } else {
      this.unregisterTeam();
    }
  },

  unregisterTeam: function () {
    var registration = this.collection.findWhere({
      'team_id': TournaGen.CURRENT_USER.teamId
    });

    registration.destroy({
      success: function (model) {
        this.collection.remove(registration);
        $(".register-button").html("Register");
        this.model.set("registered", false);
      }.bind(this)
    });
  }
});
