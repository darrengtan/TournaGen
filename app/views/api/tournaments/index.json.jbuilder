paginate @tournaments

json.array! @tournaments do |tournament|
  json.partial! "show", tournament: tournament, user: @user
end
