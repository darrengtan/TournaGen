class Team < ActiveRecord::Base
  validates :name, :owner, presence: true

  belongs_to :owner, class_name: :User, foreign_key: :owner_id
  has_many :tournament_teams, class_name: :Registration
  has_many :registered_tournaments, through: :tournament_teams, source: :tournament
end
