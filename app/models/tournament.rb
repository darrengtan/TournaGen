class Tournament < ActiveRecord::Base
  validates :title, :author, presence: true

  belongs_to :author, class_name: :User, foreign_key: :author_id
  # has_many :teams
end
