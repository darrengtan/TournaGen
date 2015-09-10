FactoryGirl.define do
  factory :user, aliases: [:author] do
    username "test"
    email    "test@aa.io"
    password "evenmoretests"
  end

end
