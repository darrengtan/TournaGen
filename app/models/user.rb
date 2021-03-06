class User < ActiveRecord::Base
  attr_reader :password
  after_initialize :ensure_session_token

  validates :email, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, length: { minimum: 4, maximum: 16 }
  validates :email, :session_token, uniqueness: true

  has_many :tournaments, foreign_key: :author_id, dependent: :destroy
  has_one :owned_team, foreign_key: :owner_id, class_name: :Team, dependent: :destroy
  has_many :registered_tournaments, through: :owned_team, source: :registered_tournaments
  has_many :follows, foreign_key: :follower_id, dependent: :destroy
  has_many :followed_tournaments, through: :follows, source: :tournament
  has_many :team_memberships, dependent: :destroy
  has_many :registered_teams, through: :team_memberships, source: :team

  def self.find_by_credentials(credential, password) # for new session
    if credential.include?("@")
      user = User.find_by_email(credential)
    else
      user = User.find_by_username(credential)
    end
    user && user.is_password?(password) ? user : nil
  end

  def reset_token! # reset session token for log in and log out
    self.session_token = SecureRandom.urlsafe_base64(16)
    self.save!
    self.session_token
  end

  def password=(password) # encrypt password
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password) # check password
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  protected
  def ensure_session_token # generate session token for new user
    self.session_token ||= SecureRandom.urlsafe_base64(16)
  end
end
