FactoryGirl.define do
  factory :follow do
    association :follower, factory: :user, strategy: :build
    association :tournament, factory: :tournament, strategy: :build
  end

end
