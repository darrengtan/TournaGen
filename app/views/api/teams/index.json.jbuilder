json.total_pages @teams.total_pages
json.page_number @page_number
json.models do
  json.array! @teams do |team|
    json.partial! "show", team: team
  end
end
