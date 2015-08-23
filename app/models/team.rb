class Team < ActiveRecord::Base
  validates :name, :captain, presence: true
  after_create :ensure_team_membership

  belongs_to :captain, class_name: :User, foreign_key: :owner_id
  has_many :registrations, foreign_key: :team_id, dependent: :destroy
  has_many :registered_tournaments, through: :registrations, source: :tournament
  has_many :team_memberships, dependent: :destroy
  has_many :team_members, through: :team_memberships, source: :user
  has_one :image, as: :imageable, dependent: :destroy

  max_paginates_per 20

  def self.inclusion
    self.includes(
      :captain,
      {registrations: [:team, :tournament]},
      :image,
      :team_members,
      {team_memberships: [:team, :user]}
    ).order(:name)
  end

  def self.search(search_params)
    search_term = "%#{search_params}%".downcase
    self.inclusion.where("LOWER(name) LIKE ?", search_term)
  end

  def ensure_team_membership
    if self.team_memberships.find_by_user_id(self.captain.id).nil?
      TeamMembership.create!(user_id: self.captain.id, team_id: self.id)
    end
  end
end
