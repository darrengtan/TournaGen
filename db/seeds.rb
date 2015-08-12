# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.create(email: "guest@aa.io", password: "tourneygen")
Tournament.create(title: "Test Tournament", author_id: 1, description: "Welcome to the first tournament!")
Team.create(name: "Beach Bums", owner_id: 1, description: "New Team!!!")
Registration.create(tournament_id: 1, team_id: 1)
