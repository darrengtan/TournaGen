json.extract! team, :id, :name, :description
json.captain team.captain.email

json.registrations do
  json.array! team.registrations do |registration|
    json.partial! "api/registrations/show", registration: registration
  end
end
