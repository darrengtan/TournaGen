# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

tourn1_results = "[[[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1]],[[2,1],[1,2]]]]"

user1 = User.create(email: "guest@aa.io", username: "Guest", password: "tourneygen")
user2 = User.create(email: "lmb@aa.io", username: "LiMuBai", password: "hiddentigers")
user3 = User.create(email: "ysl@aa.io", username: "YuShuLien", password: "crouchingdragons")
user4 = User.create(email: "plf@aa.io", username: "PeteLaFleur", password: "waytooaverage")
user5 = User.create(email: "wg@aa.io", username: "WhiteGoodman", password: "globogym")
user6 = User.create(email: "patches@aa.io", username: "PatchesFanatic", password: "allhailwrenches")
user7 = User.create(email: "mml@aa.io", username: "ManMythLegend", password: "themanthemyththelegend")
user8 = User.create(email: "chucknorris@aa.io", username: "ChuckNorris", password: "chucknorrisfacts")

tourn1 = Tournament.create(title: "1st Tournament Tutorial", author_id: user1.id, description: "Welcome to the first tournament ever hosted on TournaGen! This is an example of a tournament starting from scratch. Take a look around!", max_teams: 32, results: tourn1_results)
tourn2 = Tournament.create(title: "If You can Dodge a Wrench", author_id: user2.id, description: "Welcome to the official dogeball tournament for TournaGen!", max_teams: 8)
tourn3 = Tournament.create(title: "If You can Dodge a Hammer", author_id: user1.id, description: "Welcome to the official dogeball tournament for TournaGen!", max_teams: 8)

team2 = Team.create(name: "Crouching Tigers", owner_id: user2.id, description: "No growth without assistance. No action without reaction. No desire without restraint. Now give yourself up and find yourself again.")
team3 = Team.create(name: "Hidden Dragons", owner_id: user3.id, description: "Fighters have rules, too. Friendship, trust, integrity. Always keep your promise. Without rules we wouldn't survive long.")
team4 = Team.create(name: "Average Joe's", owner_id: user4.id, description: "Average Joe's is a local team named under the gym they are trying to save from bankruptcy. Led by its owner Pete LaFleur and coached by dodgeball legend 'Patches' O'Houlihan, they hope to win all dodgeball tournaments to keep their gym afloat.")
team5 = Team.create(name: "Purple Cobras", owner_id: user5.id, description: "You ready for the, whoooo, hurricane?")
team6 = Team.create(name: "The Patches", owner_id: user6.id, description: "Devastated by the loss of Patches in the movie Dodgeball, a group of fanatics have teamed up to pay their respects to Patches with one last tournament.")
team7 = Team.create(name: "Legends", owner_id: user7.id, description: "The Man, The Myth, The Legend has graced the tournament floor. Do you dare stand in his way to glory?")
team8 = Team.create(name: "Chuck Norris", owner_id: user8.id, description: "Fear of spiders is called arachnophobia, fear of tight spaces is called claustrophobia, fear of Chuck Norris is called logic.")

reg1 = Registration.create(tournament_id: tourn1.id, team_id: team2.id)
reg2 = Registration.create(tournament_id: tourn1.id, team_id: team3.id)
reg3 = Registration.create(tournament_id: tourn1.id, team_id: team4.id)
reg4 = Registration.create(tournament_id: tourn1.id, team_id: team5.id)
reg5 = Registration.create(tournament_id: tourn1.id, team_id: team6.id)
reg6 = Registration.create(tournament_id: tourn1.id, team_id: team7.id)
reg7 = Registration.create(tournament_id: tourn1.id, team_id: team8.id)
reg8 = Registration.create(tournament_id: tourn2.id, team_id: team2.id)
reg9 = Registration.create(tournament_id: tourn2.id, team_id: team3.id)
reg10 = Registration.create(tournament_id: tourn2.id, team_id: team4.id)
reg11 = Registration.create(tournament_id: tourn2.id, team_id: team5.id)
reg12 = Registration.create(tournament_id: tourn2.id, team_id: team6.id)
reg13 = Registration.create(tournament_id: tourn2.id, team_id: team7.id)
reg14 = Registration.create(tournament_id: tourn2.id, team_id: team8.id)

foll1 = Follow.create(tournament_id: tourn1.id, follower_id: user2.id)
foll2 = Follow.create(tournament_id: tourn1.id, follower_id: user3.id)
foll3 = Follow.create(tournament_id: tourn1.id, follower_id: user4.id)
foll4 = Follow.create(tournament_id: tourn1.id, follower_id: user5.id)
foll5 = Follow.create(tournament_id: tourn1.id, follower_id: user6.id)
foll6 = Follow.create(tournament_id: tourn1.id, follower_id: user7.id)
foll7 = Follow.create(tournament_id: tourn1.id, follower_id: user8.id)
foll8 = Follow.create(tournament_id: tourn2.id, follower_id: user1.id)
foll9 = Follow.create(tournament_id: tourn2.id, follower_id: user2.id)
foll10 = Follow.create(tournament_id: tourn2.id, follower_id: user3.id)
foll11 = Follow.create(tournament_id: tourn2.id, follower_id: user4.id)
foll12 = Follow.create(tournament_id: tourn2.id, follower_id: user5.id)
foll13 = Follow.create(tournament_id: tourn3.id, follower_id: user1.id)

tm1 = TeamMembership.create(team_id: team2.id, user_id: user1.id)
tm2 = TeamMembership.create(team_id: team2.id, user_id: user2.id)
tm3 = TeamMembership.create(team_id: team3.id, user_id: user3.id)
tm3 = TeamMembership.create(team_id: team4.id, user_id: user4.id)
tm3 = TeamMembership.create(team_id: team5.id, user_id: user5.id)
tm3 = TeamMembership.create(team_id: team6.id, user_id: user6.id)
tm3 = TeamMembership.create(team_id: team7.id, user_id: user7.id)
tm3 = TeamMembership.create(team_id: team8.id, user_id: user8.id)

image1 = team2.images.create(url: "http://animalia-life.com/data_images/cat/cat7.jpg")
