class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id
  has_many :registered_teams, through: :registrations, source: :team

  def test_bracket
    matchups = self.seed_teams

    bracket = BracketTree::Bracket::SingleElimination.by_size(self.max_teams)
    bracket.seed matchups
    bracket
  end

  def seed_teams
    matchups = []
    seeds = (1..self.max_teams).to_a
    midpoint = self.max_teams / 2
    (0...midpoint).each do |n|
      matchups << { name: "Team#{n + 1}", seed_value: n + 1}
      matchups << { name: "Team#{self.max_teams - n}", seed_value: self.max_teams - n }
    end

    matchups
  end

  def num_rounds
    Math.log2(self.max_teams).ceil
  end

  def num_byes
    2 ** self.num_rounds - self.max_teams
  end
end
