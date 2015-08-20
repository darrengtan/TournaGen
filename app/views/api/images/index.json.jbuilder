json.array! @images do |image|
  json.partial! "show", image: image
end
