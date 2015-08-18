json.array! @team_memberships do |team_membership|
  json.partial! "show", team_membership: team_membership
end
