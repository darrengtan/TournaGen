json.extract! team, :id, :name, :description
json.captain team.captain.username

json.registrations do
  json.array! team.registrations do |registration|
    json.partial! "api/registrations/show", registration: registration
  end
end

json.team_memberships do
  json.array! team.team_memberships do |team_membership|
    json.partial! "api/team_memberships/show", team_membership: team_membership
  end
end
