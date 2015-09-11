require 'rails_helper'

RSpec.describe Team, type: :model do
  let(:team) { FactoryGirl.create(:team) }

  it "has required attributes" do
    expect(team).to be_valid
    expect(Team.new).to_not be_valid
    # requires owner_id
    expect(Team.new(name: "testing")).to_not be_valid
  end
end
