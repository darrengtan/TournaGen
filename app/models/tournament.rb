class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id
  has_many :registered_teams, through: :registrations, source: :team

  def parse_results
    JSON.parse(self.results)
  end

  def seed_teams
    seeds = [1]
    num_rounds = Math.log2(self.max_teams).to_i + 1
    round = 1
    until round == num_rounds
      new_seeds = []
      seeds.each do |seed|
        new_seeds << seed << (2 ** round + 1) - seed
      end
      seeds = new_seeds
      round += 1
    end

    self.pair_matchups(seeds)
  end

  def pair_matchups(seeds_arr)
    pairs = [];
    until seeds_arr.empty?
      pairs << seeds_arr.shift(2)
    end

    pairs.map { |pair| pair.map { |seed| "Team #{seed}" }}
  end

  def test_bracket
    template = BracketTree::Template::SingleElimination.by_size(32)
  end

  def starting_seeds
    self.test_bracket.starting_seats
  end

  def num_rounds
    Math.log2(self.max_teams).ceil
  end

  def num_byes
    2 ** self.num_rounds - self.max_teams
  end
end
