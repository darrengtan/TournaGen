class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id
  has_many :registered_teams, through: :registrations, source: :team

  def test_bracket
    players = []
    4.times do |n|
      players << { login: "Player#{n}", seed_value: n }
    end

    bracket = BracketTree::Bracket::SingleElimination.by_size 4
    bracket.seed players
    bracket
  end
end
