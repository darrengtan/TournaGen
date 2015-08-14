class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id
  has_many :registered_teams, through: :registrations, source: :team

  def test_bracket
    template = BracketTree::Template::SingleElimination.by_size(32)
  end

  def starting_seeds
    self.test_bracket.starting_seats
  end

  def seed_teams
    start = [1]
    num_rounds = Math.log2(32).to_i + 1
    round = 1
    until round == num_rounds
      new_start = []
      start.each do |seed|
        new_start << seed << (2 ** round + 1) - seed
      end
      start = new_start
      round += 1
    end

    pairs = [];
    until start.empty?
      pairs << start.shift(2)
    end

    pairs
  end

  def num_rounds
    Math.log2(self.max_teams).ceil
  end

  def num_byes
    2 ** self.num_rounds - self.max_teams
  end
end
