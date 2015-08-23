User.create!([
  {email: "guest@aa.io", password_digest: "$2a$10$EO4r9eC8nTXRnRlwGBRgXOD0PHj9rtEFqX7bOFOZcdfUvzJlJ/ata", session_token: "shzLlyS9PfPCKZj9rtEpEQ", username: "Guest"},
  {email: "lmb@aa.io", password_digest: "$2a$10$Cjtca8/cCt0hxltKO/ZOAOiuiilVFxR3oo0GkbgYB0oCIWCUOKoxS", session_token: "ObTYuEwHm3WVX3r1vNWJtA", username: "LiMuBai"},
  {email: "ysl@aa.io", password_digest: "$2a$10$1vKhDY792H0IqluE970yFeypGtufILNFvI78SXZP7odkW.9cHiaHW", session_token: "QbW0tLK6HiFVYTS0Wl3OYQ", username: "YuShuLien"},
  {email: "plf@aa.io", password_digest: "$2a$10$Es6Sfs7Env.hVv7kF8.yOuOC4ETGj8D11v00cPXPoLxGajeOyWvWO", session_token: "A9bdmFIijq87ega6hNJEAA", username: "PeteLaFleur"},
  {email: "wg@aa.io", password_digest: "$2a$10$3nZ6OVXkH21zIOUADnIWvukQSU0pUbx0iyr.EYjmGnBUsgA96lmfm", session_token: "E41LEUXgcK8OyymU3EXWpQ", username: "WhiteGoodman"},
  {email: "patches@aa.io", password_digest: "$2a$10$edLni.UOZr5A7IQ7Nh39bOdgNuuEMEdv0fQ7ZduCz0ZafmxhTNNVy", session_token: "Aezm_x_YGTudRCjw9KreEg", username: "PatchesFanatic"},
  {email: "mml@aa.io", password_digest: "$2a$10$OUa9LfhJB.u2GsCRCS.Ni.sgqcM3dmS/rH6zfdDzREbGn0wPRMKOG", session_token: "WmVENd76dD9wyHZwDzFJqQ", username: "ManMythLegend"},
  {email: "chucknorris@aa.io", password_digest: "$2a$10$FMVeL0Sl.TFuRBXBdlt.jOor5j/eIuRMdQaPJSBmEA6.El/ttGkL6", session_token: "s5Eru33Pi2hYMIC7f6itow", username: "ChuckNorris"},
  {email: "k@aa.io", password_digest: "$2a$10$n9690VMYwqDRD6m0nu08Gu56HUT4sbVAHhjfmJLj.KR2cAmmdlO16", session_token: "zmFDYrSO2qS93VW5jSy7Eg", username: "Kentucky"},
  {email: "v@aa.io", password_digest: "$2a$10$9j5GWudhQCUtTYFwg2w6wu0yNbLG17m9ik6VZxnVLbBaQRDQ5OW.i", session_token: "umkHgQWs0xB5R4vP0KP8ww", username: "Villanova"},
  {email: "duke@aa.io", password_digest: "$2a$10$wj4h387o8ZekwniwyNEbMOHd0BYxYA1Cg.hl/r1Sl/5vnuWWy.7UW", session_token: "t1iWaT7DST7S0CiKvq_1WA", username: "Duke"},
  {email: "w@aa.io", password_digest: "$2a$10$CQ4pUlzjXwINIu5TaR9PFelHDJb5lXKUsWWmN.S/xprpWa.7r/b7u", session_token: "2jcGojtBY0TktbK2t0Cmdw", username: "Wisconsin"},
  {email: "va@aa.io", password_digest: "$2a$10$T8vwgbM/nJn8cnnoOYKGxesD3WDC/ss6Gb5OOu.fX.glATbyazXq.", session_token: "eM4gjqnCsqt3S_b8N6ytNQ", username: "Virginia"},
  {email: "a@aa.io", password_digest: "$2a$10$qQjsMwEn6Un6v5JRM01Yde0Na5CSMr2calfTWFtb1fRYEhxDhNa4y", session_token: "E3diBrj7H6ZGuK9ysiYqqg", username: "Arizona"},
  {email: "g@aa.io", password_digest: "$2a$10$U9/dDQMRJ1prYBUWJ9zsFO42DJvd0CMG6BfEBtjmVSy/KtLAEivE2", session_token: "oeCihGImIlWFdnD1u38JBg", username: "Gonzaga"},
  {email: "ka@aa.io", password_digest: "$2a$10$0erljmJt94G8N.m7pBbHyepDMIKDN3aMijOJtCepr1Mm4vft6d5Jy", session_token: "ac6Pp16gEsCeb8zWh_tDGg", username: "Kansas"},
  {email: "is@aa.io", password_digest: "$2a$10$iEsiOxdnHw0HK14oxBO/kuIEeJk90om.xl7GugyN6.tosiMSYzvGy", session_token: "po5cF5O-94J7j_ZMEfUT6Q", username: "IowaState"}
])

Team.create!([
  {owner_id: 2, name: "Crouching Tigers", description: "No growth without assistance. No action without reaction. No desire without restraint. Now give yourself up and find yourself again."},
  {owner_id: 3, name: "Hidden Dragons", description: "Fighters have rules, too. Friendship, trust, integrity. Always keep your promise. Without rules we wouldn't survive long."},
  {owner_id: 4, name: "Average Joe's", description: "Average Joe's is a local team named under the gym they are trying to save from bankruptcy. Led by its owner Pete LaFleur and coached by dodgeball legend 'Patches' O'Houlihan, they hope to win all dodgeball tournaments to keep their gym afloat."},
  {owner_id: 5, name: "Purple Cobras", description: "You ready for the, whoooo, hurricane?"},
  {owner_id: 6, name: "The Patches", description: "Devastated by the loss of Patches in the movie Dodgeball, a group of fanatics have teamed up to pay their respects to Patches with one last tournament."},
  {owner_id: 7, name: "Legends", description: "The Man, The Myth, The Legend has graced the tournament floor. Do you dare stand in his way to glory?"},
  {owner_id: 8, name: "Chuck Norris", description: "Fear of spiders is called arachnophobia, fear of tight spaces is called claustrophobia, fear of Chuck Norris is called logic."},
  {owner_id: 9, name: "Kentucky", description: ""},
  {owner_id: 10, name: "Villanoma", description: ""},
  {owner_id: 11, name: "Duke", description: ""},
  {owner_id: 12, name: "Wisconsin", description: ""},
  {owner_id: 13, name: "Virginia", description: ""},
  {owner_id: 14, name: "Arizona", description: ""},
  {owner_id: 15, name: "Gonzaga", description: ""},
  {owner_id: 16, name: "Kansas", description: ""},
  {owner_id: 17, name: "Iowa State", description: ""}
])

Image.create!([
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296455/dlm1nl0gjnktjtto3mmn.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296455/dlm1nl0gjnktjtto3mmn.jpg", imageable_id: 1, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296658/z1jhnctvhaayzz4hij7w.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296658/z1jhnctvhaayzz4hij7w.jpg", imageable_id: 2, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296678/nthu3cr9faf1zvgn9jkb.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296678/nthu3cr9faf1zvgn9jkb.png", imageable_id: 3, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296844/xyweb4kp7bbz8zxzvpa8.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296844/xyweb4kp7bbz8zxzvpa8.jpg", imageable_id: 4, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296268/naslsnz01rlqswwbsmsr.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296268/naslsnz01rlqswwbsmsr.jpg", imageable_id: 5, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440296946/r0aqpdylbq37m1bpn9ds.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440296946/r0aqpdylbq37m1bpn9ds.jpg", imageable_id: 6, imageable_type: "Team"},
  {url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440297049/xtasoavag0e7d1tfg2rq.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440297049/xtasoavag0e7d1tfg2rq.jpg", imageable_id: 7, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301079/t4cyfgnh0gtkieyhbaao.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301079/t4cyfgnh0gtkieyhbaao.png", imageable_id: 8, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301387/j6tjyzuzimkeqaahkrey.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301387/j6tjyzuzimkeqaahkrey.jpg", imageable_id: 9, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301485/fkvsch5y5d6idcwhlubg.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301485/fkvsch5y5d6idcwhlubg.jpg", imageable_id: 10, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301628/q5fltvdrxgxkb5pjvkjk.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301628/q5fltvdrxgxkb5pjvkjk.png", imageable_id: 11, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301737/bn53qy3tewrb8tuq02cj.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301737/bn53qy3tewrb8tuq02cj.png", imageable_id: 12, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301831/f2ixevfshvlir1yg3hs6.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301831/f2ixevfshvlir1yg3hs6.png", imageable_id: 13, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440301930/dgy4m0uo8ih26uo8fe5y.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440301930/dgy4m0uo8ih26uo8fe5y.png", imageable_id: 14, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440302043/vmumgt0sfnzbhewjv2sa.jpg", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440302043/vmumgt0sfnzbhewjv2sa.jpg", imageable_id: 15, imageable_type: "Team"},
  {url: "http://res.cloudinary.com/dlrvqt6fn/image/upload/v1440302135/pcjb6kse5aeie1a2oz9z.png", thumb_url: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440302135/pcjb6kse5aeie1a2oz9z.png", imageable_id: 16, imageable_type: "Team"}
])

Tournament.create!([
  {author_id: 1, title: "1st Tournament Tutorial", description: "Welcome to the first tournament ever hosted on TournaGen! This is an example of a tournament starting from scratch. Take a look around!", max_teams: 32, results: "[[[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1]],[[2,1],[1,2]]]]", double_elim: false},
  {author_id: 2, title: "If You can Dodge a Wrench", description: "Welcome to the official dogeball tournament for TournaGen!", max_teams: 8, results: "[]", double_elim: false},
  {author_id: 1, title: "May Madness", description: "It's the 31st annual May Madness tournament! Live out your predictions for March Madness here. Disclaimer: None of these teams are actually the NCAA teams they're portraying.", max_teams: 64, results: "[]", double_elim: false}
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
  {tournament_id: 3, follower_id: 1},
  {tournament_id: 3, follower_id: 9},
  {tournament_id: 3, follower_id: 10},
  {tournament_id: 3, follower_id: 11},
  {tournament_id: 3, follower_id: 12},
  {tournament_id: 3, follower_id: 13},
  {tournament_id: 3, follower_id: 14},
  {tournament_id: 3, follower_id: 15},
  {tournament_id: 3, follower_id: 16},
  {tournament_id: 3, follower_id: 17}
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
  {tournament_id: 2, team_id: 7},
  {tournament_id: 3, team_id: 8},
  {tournament_id: 3, team_id: 9},
  {tournament_id: 3, team_id: 10},
  {tournament_id: 3, team_id: 11},
  {tournament_id: 3, team_id: 12},
  {tournament_id: 3, team_id: 13},
  {tournament_id: 3, team_id: 14},
  {tournament_id: 3, team_id: 15},
  {tournament_id: 3, team_id: 16}
])

TeamMembership.create!([
  {team_id: 1, user_id: 1},
])
