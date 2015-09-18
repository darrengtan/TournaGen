json.total_pages @tournaments.total_pages
json.page_number @page_number
json.models do
  json.array! @tournaments do |tournament|
    json.partial! "show", tournament: tournament, user: @user
  end
end
