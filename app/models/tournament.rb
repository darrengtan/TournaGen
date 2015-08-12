class Tournament < ActiveRecord::Base
  validates :title, :author, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  has_many :tournament_teams, class_name: :Registration
  has_many :registered_teams, through: :tournament_teams, source: :team
end
