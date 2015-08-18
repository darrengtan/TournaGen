class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id, dependent: :destroy
  has_many :registered_teams, through: :registrations, source: :team
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :follower

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
    pairs.map do |pair|
      pair.map do |seed|
        self.registered_teams[seed - 1] ?
          "(#{seed}) #{self.registered_teams[seed - 1].name}" : "Team #{seed}"
      end
    end
  end

  def num_rounds
    if self.double_elim
      Math.log2(self.max_teams).ceil * 2 + 1
    else
      Math.log2(self.max_teams).ceil + 1
    end
  end
end
