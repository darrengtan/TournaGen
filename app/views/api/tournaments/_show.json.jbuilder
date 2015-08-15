json.extract! tournament, :id, :title, :description, :max_teams, :updated_at
json.results tournament.parse_results
json.host tournament.author.username

json.registrations do
  json.array! tournament.registrations do |registration|
    json.partial! "api/registrations/show", registration: registration
  end
end

json.authorized tournament.author === current_user
json.registered current_user.registered_tournaments.include?(tournament)

if current_user.registered_tournaments.include?(tournament)
  json.registrationId current_user.owned_team.registrations.find_by_tournament_id(tournament.id).id
end

json.seeds tournament.seed_teams
