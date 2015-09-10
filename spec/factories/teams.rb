FactoryGirl.define do
  factory :team do
    association :captain, factory: :user, strategy: :build
    name "The Test Team"
    description "Welcome to more tests!"
  end
end
