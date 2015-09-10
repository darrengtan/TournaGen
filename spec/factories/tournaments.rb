FactoryGirl.define do
  factory :tournament do
    association :author, factory: :user, strategy: :build
    title       "Test Tournament"
    description "Testing tournaments is awesome!"
    max_teams   8
    results     "[]"
    double_elim false
  end
end
