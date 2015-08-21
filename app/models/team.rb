class Team < ActiveRecord::Base
  validates :name, :captain, presence: true
  after_save :ensure_logo, :ensure_team_membership

  belongs_to :captain, class_name: :User, foreign_key: :owner_id
  has_many :registrations, foreign_key: :team_id, dependent: :destroy
  has_many :registered_tournaments, through: :registrations, source: :tournament
  has_many :team_memberships, dependent: :destroy
  has_many :team_members, through: :team_memberships, source: :user
  has_one :image, as: :imageable, dependent: :destroy

  def self.search(search_params)
    search_term = "%#{search_params}%".downcase
    self.includes(:captain, :registrations, :image)
        .where("LOWER(name) LIKE ?", search_term)
  end

  def ensure_logo
    Image.create!(imageable_id: self.id, imageable_type: :Team)
  end

  def ensure_team_membership
    TeamMembership.create!(user_id: self.captain.id, team_id: self.id)
  end
end
