json.extract! team, :id, :name, :description
json.captain team.captain.username

json.registrations do
  json.array! team.registrations do |registration|
    json.partial! "api/registrations/show", registration: registration
  end
end
