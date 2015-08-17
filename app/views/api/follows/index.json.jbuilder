json.array! @follows do |follow|
  json.partial! "show", follow: follow
end
