json.extract! tournament, :id, :title, :description, :max_teams, :updated_at

json.teams do
  json.array! tournament.registered_teams do |team|
    json.partial! "team_show", team: team
  end
end

json.registered current_user.registered_tournaments.include?(tournament)

if current_user.registered_tournaments.include?(tournament)
  json.registrationId current_user.owned_team.registrations.where(tournament_id: tournament.id).first.id
end
