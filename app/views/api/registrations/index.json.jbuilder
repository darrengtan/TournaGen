json.array! @registrations do |registration|
  json.partial! "show", registration: registration
end
