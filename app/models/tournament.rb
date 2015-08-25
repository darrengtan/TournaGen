class Tournament < ActiveRecord::Base
  validates :title, :author, :max_teams, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id, dependent: :destroy
  has_many :registered_teams, through: :registrations, source: :team
  has_many :follows, dependent: :destroy
  has_many :followers, through: :follows, source: :follower

  max_paginates_per 20

  def self.inclusion
    self.includes(
      :author,
      { registrations: [:team, :tournament]},
      { follows: [:follower, :tournament]}
    ).order(:title)
  end

  def self.search(search_params)
    search_term = "%#{search_params}%".downcase
    self.inclusion
        .where("LOWER(title) LIKE ?", search_term)
  end

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
    registrations = self.class.includes(registrations: :team)
    pairs = [];
    until seeds_arr.empty?
      pairs << seeds_arr.shift(2)
    end
    pairs.map do |pair|
      pair.map do |seed|
        self.registered_teams[seed - 1] ?
          "(#{seed}) #{self.registrations[seed - 1].team.name}" : "Team #{seed}"
      end
    end
  end

  def num_rounds
    rounds = Math.log2(self.max_teams).ceil
    if self.double_elim
      case rounds
      when 2
        rounds * 2 + 1
      when 6 || 7
        rounds * 2 + 3
      else
        rounds * 2 + 2
      end
    else
      rounds >= 6 ? rounds + 2 : rounds + 1
    end
  end

  def completion
    results = self.parse_results.flatten
    return 0 if results.empty?
    total = results.length
    entered = results.select { |el| !el.nil? }.length
    completed = entered.even? ? entered : entered - 1
    (completed.to_f / total * 100).to_i
  end
end
