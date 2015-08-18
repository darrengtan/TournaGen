json.extract! team_membership, :id, :team_id, :user_id
json.team_name team_membership.team.name
json.user_username team_membership.user.username
