FactoryGirl.define do
  factory :tournament do
    author
    title       "Test Tournament"
    description "Testing tournaments is awesome!"
    max_teams   8
    results     "[]"
    double_elim false
  end

end
