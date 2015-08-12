json.extract! tournament, :id, :title, :description, :updated_at

json.teams do
  json.array! tournament.registered_teams do |team|
    json.partial! "team_show", team: team
  end
end
