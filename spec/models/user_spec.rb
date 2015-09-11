require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryGirl.create(:user) }

  it "generates session token upon creation" do
    expect(user.session_token).to_not be_nil
  end

  it "resets token" do
    old_session = user.session_token
    expect(user.reset_token!).to_not eq(old_session)
  end
end
