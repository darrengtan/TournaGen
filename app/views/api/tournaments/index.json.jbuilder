json.total_pages @tournaments.total_pages
json.array! @tournaments do |tournament|
  json.partial! "show", tournament: tournament, user: @user
end
