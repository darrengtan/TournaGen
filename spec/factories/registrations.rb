FactoryGirl.define do
  factory :registration do
    association :team, factory: :team, strategy: :build
    association :tournament, factory: :tournament, strategy: :build
  end

end
