class Follow < ActiveRecord::Base
  validates :tournament, :follower, presence: true

  belongs_to :tournament
  belongs_to :follower, class_name: :User
end
