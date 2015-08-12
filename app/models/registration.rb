class Registration < ActiveRecord::Base
  validates :team, :tournament, presence: true

  belongs_to :team
  belongs_to :tournament
end
