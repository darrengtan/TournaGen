json.extract! tournament, :id, :title, :description, :max_teams, :updated_at
json.isDoubleElim tournament.double_elim
json.numRounds tournament.num_rounds
json.results tournament.parse_results
json.host tournament.author.username
json.authorized tournament.author === current_user
json.registered current_user.registered_tournaments.include?(tournament)
json.following current_user.followed_tournaments.include?(tournament)
json.userTeam !!current_user.owned_team

if current_user.registered_tournaments.include?(tournament)
  json.registrationId current_user.owned_team.registrations.find_by_tournament_id(tournament.id).id
end

if current_user.followed_tournaments.include?(tournament)
  json.followId current_user.follows.find_by_tournament_id(tournament.id).id
end

json.registrations do
  json.array! tournament.registrations do |registration|
    json.partial! "api/registrations/show", registration: registration
  end
end

json.follows do
  json.array! tournament.follows do |follow|
    json.partial! "api/follows/show", follow: follow
  end
end


json.seeds tournament.seed_teams
