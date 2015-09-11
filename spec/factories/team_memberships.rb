FactoryGirl.define do
  factory :team_membership do
    association :team, factory: :team, strategy: :build
    association :user, factory: :user, strategy: :build
  end
end
