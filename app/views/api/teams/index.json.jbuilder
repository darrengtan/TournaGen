paginate @teams

json.array! @teams do |team|
  json.partial! "show", team: team
end
