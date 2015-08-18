class Team < ActiveRecord::Base
  validates :name, :captain, presence: true

  belongs_to :captain, class_name: :User, foreign_key: :owner_id
  has_many :registrations, foreign_key: :team_id
  has_many :registered_tournaments, through: :registrations, source: :tournament
  has_many :team_memberships
  has_many :team_members, through: :team_memberships, source: :user
end
