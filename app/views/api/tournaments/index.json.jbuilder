json.array! @tournaments do |tournament|
  json.partial! "show", tournament: tournament
end
