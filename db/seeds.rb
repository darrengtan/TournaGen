User.create!([
  {email: "guest@aa.io", password_digest: "$2a$10$EO4r9eC8nTXRnRlwGBRgXOD0PHj9rtEFqX7bOFOZcdfUvzJlJ/ata", session_token: "NcQh-shQN7RurB_-4FXY_Q", username: "Guest"},
  {email: "lmb@aa.io", password_digest: "$2a$10$Cjtca8/cCt0hxltKO/ZOAOiuiilVFxR3oo0GkbgYB0oCIWCUOKoxS", session_token: "ObTYuEwHm3WVX3r1vNWJtA", username: "LiMuBai"},
  {email: "ysl@aa.io", password_digest: "$2a$10$1vKhDY792H0IqluE970yFeypGtufILNFvI78SXZP7odkW.9cHiaHW", session_token: "QbW0tLK6HiFVYTS0Wl3OYQ", username: "YuShuLien"},
  {email: "plf@aa.io", password_digest: "$2a$10$Es6Sfs7Env.hVv7kF8.yOuOC4ETGj8D11v00cPXPoLxGajeOyWvWO", session_token: "A9bdmFIijq87ega6hNJEAA", username: "PeteLaFleur"},
  {email: "wg@aa.io", password_digest: "$2a$10$3nZ6OVXkH21zIOUADnIWvukQSU0pUbx0iyr.EYjmGnBUsgA96lmfm", session_token: "E41LEUXgcK8OyymU3EXWpQ", username: "WhiteGoodman"},
  {email: "patches@aa.io", password_digest: "$2a$10$edLni.UOZr5A7IQ7Nh39bOdgNuuEMEdv0fQ7ZduCz0ZafmxhTNNVy", session_token: "Aezm_x_YGTudRCjw9KreEg", username: "PatchesFanatic"},
  {email: "mml@aa.io", password_digest: "$2a$10$OUa9LfhJB.u2GsCRCS.Ni.sgqcM3dmS/rH6zfdDzREbGn0wPRMKOG", session_token: "WmVENd76dD9wyHZwDzFJqQ", username: "ManMythLegend"},
  {email: "chucknorris@aa.io", password_digest: "$2a$10$FMVeL0Sl.TFuRBXBdlt.jOor5j/eIuRMdQaPJSBmEA6.El/ttGkL6", session_token: "s5Eru33Pi2hYMIC7f6itow", username: "ChuckNorris"}
])

Team.create!([
  {owner_id: 2, name: "Crouching Tigers", description: "No growth without assistance. No action without reaction. No desire without restraint. Now give yourself up and find yourself again."},
  {owner_id: 3, name: "Hidden Dragons", description: "Fighters have rules, too. Friendship, trust, integrity. Always keep your promise. Without rules we wouldn't survive long."},
  {owner_id: 4, name: "Average Joe's", description: "Average Joe's is a local team named under the gym they are trying to save from bankruptcy. Led by its owner Pete LaFleur and coached by dodgeball legend 'Patches' O'Houlihan, they hope to win all dodgeball tournaments to keep their gym afloat."},
  {owner_id: 5, name: "Purple Cobras", description: "You ready for the, whoooo, hurricane?"},
  {owner_id: 6, name: "The Patches", description: "Devastated by the loss of Patches in the movie Dodgeball, a group of fanatics have teamed up to pay their respects to Patches with one last tournament."},
  {owner_id: 7, name: "Legends", description: "The Man, The Myth, The Legend has graced the tournament floor. Do you dare stand in his way to glory?"},
  {owner_id: 8, name: "Chuck Norris", description: "Fear of spiders is called arachnophobia, fear of tight spaces is called claustrophobia, fear of Chuck Norris is called logic."}
])

Image.create!([
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296455/dlm1nl0gjnktjtto3mmn.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296455/dlm1nl0gjnktjtto3mmn.jpg", imageable_id: 1, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296658/z1jhnctvhaayzz4hij7w.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296658/z1jhnctvhaayzz4hij7w.jpg", imageable_id: 2, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296678/nthu3cr9faf1zvgn9jkb.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296678/nthu3cr9faf1zvgn9jkb.png", imageable_id: 3, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296844/xyweb4kp7bbz8zxzvpa8.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296844/xyweb4kp7bbz8zxzvpa8.jpg", imageable_id: 4, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296268/naslsnz01rlqswwbsmsr.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296268/naslsnz01rlqswwbsmsr.jpg", imageable_id: 5, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296946/r0aqpdylbq37m1bpn9ds.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296946/r0aqpdylbq37m1bpn9ds.jpg", imageable_id: 6, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440297049/xtasoavag0e7d1tfg2rq.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440297049/xtasoavag0e7d1tfg2rq.jpg", imageable_id: 7, imageable_type: "Team"}
])

Tournament.create!([
  {author_id: 1, title: "1st Tournament Tutorial", description: "Welcome to the first tournament ever hosted on TournaGen! This is an example of a tournament starting from scratch. Take a look around!", max_teams: 32, results: "[[[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1]],[[2,1],[1,2]]]]", double_elim: false},
  {author_id: 2, title: "If You can Dodge a Wrench", description: "Welcome to the official dogeball tournament for TournaGen!", max_teams: 8, results: "[]", double_elim: false},
  {author_id: 1, title: "May Madness", description: "It's the 31st annual May Madness tournament! Live out your predictions for March Madness here. Disclaimer: None of these teams are actually the NCAA teams they're portraying.", max_teams: 8, results: "[]", double_elim: false}
])

Follow.create!([
  {tournament_id: 1, follower_id: 2},
  {tournament_id: 1, follower_id: 3},
  {tournament_id: 1, follower_id: 4},
  {tournament_id: 1, follower_id: 5},
  {tournament_id: 1, follower_id: 6},
  {tournament_id: 1, follower_id: 7},
  {tournament_id: 1, follower_id: 8},
  {tournament_id: 2, follower_id: 1},
  {tournament_id: 2, follower_id: 2},
  {tournament_id: 2, follower_id: 3},
  {tournament_id: 2, follower_id: 4},
  {tournament_id: 2, follower_id: 5},
  {tournament_id: 3, follower_id: 1}
])

Registration.create!([
  {tournament_id: 1, team_id: 1},
  {tournament_id: 1, team_id: 2},
  {tournament_id: 1, team_id: 3},
  {tournament_id: 1, team_id: 4},
  {tournament_id: 1, team_id: 5},
  {tournament_id: 1, team_id: 6},
  {tournament_id: 1, team_id: 7},
  {tournament_id: 2, team_id: 1},
  {tournament_id: 2, team_id: 2},
  {tournament_id: 2, team_id: 3},
  {tournament_id: 2, team_id: 4},
  {tournament_id: 2, team_id: 5},
  {tournament_id: 2, team_id: 6},
  {tournament_id: 2, team_id: 7}
])

TeamMembership.create!([
  {team_id: 1, user_id: 1}
])
