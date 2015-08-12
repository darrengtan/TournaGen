class Tournament < ActiveRecord::Base
  validates :title, :author, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :registrations, foreign_key: :tournament_id
  has_many :registered_teams, through: :registrations, source: :team
end
