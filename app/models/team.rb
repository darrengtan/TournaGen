class Team < ActiveRecord::Base
  validates :name, :owner, presence: true

  belongs_to :owner, class_name: :User, foreign_key: :owner_id
  has_many :registrations, foreign_key: :team_id
  has_many :registered_tournaments, through: :registrations, source: :tournament
end
