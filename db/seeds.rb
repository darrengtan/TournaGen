# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

user1 = User.create(email: "guest@aa.io", password: "tourneygen")
user2 = User.create(email: "bob@aa.io", password: "weirdpassword")
tourn1 = Tournament.create(title: "Test Tournament", author_id: user1.id, description: "Welcome to the first tournament!", max_teams: 8)
team1 = Team.create(name: "Beach Bums", owner_id: user1.id, description: "First Team")
team2 = Team.create(name: "Crouching Tigers", owner_id: user2.id, description: "Second Team")
reg1 = Registration.create(tournament_id: tourn1.id, team_id: team2.id)
