class Team < ActiveRecord::Base
  validates :name, :owner, presence: true

  belongs_to :owner, class_name: :User, foreign_key: :owner_id
end
