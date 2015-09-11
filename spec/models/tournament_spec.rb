require 'rails_helper'

RSpec.describe Tournament, type: :model do
  let(:tournament) { FactoryGirl.create(:tournament) }
  let(:incomplete_tournament) {
    FactoryGirl.build(
    :tournament,
    double_elim: true,
    results: "[[[[2,1],[2,1],[2,0],[1,2]],[[null,null],[null,null]],[[null,null]]],[[[null,null],[null,null]],[[null,null],[null,null]],[[null,null]],[[null,null]]],[[[null,null],[null,null]]]]"
    )
  }

  it "has required attributes" do
    expect(tournament).to be_valid
    expect(Tournament.new).to be_invalid
    expect(Tournament.new(title: "testing")).to be_invalid
    expect(Tournament.new(max_teams: 4)).to be_invalid
    expect(Tournament.new(title: "testing", max_teams: 4)).to be_invalid
  end

  it "creates correct matchups" do
    matchups = [
      ["Team 1", "Team 8"],
      ["Team 4", "Team 5"],
      ["Team 2", "Team 7"],
      ["Team 3", "Team 6"]
    ]
    expect(tournament.seed_teams).to eq(matchups)
  end

  it "parses results" do

  end

  it "shows number of rounds" do
    expect(tournament.num_rounds).to eq(4)
    big_tournament = FactoryGirl.build(
      :tournament,
      max_teams: 64,
      double_elim: true
    )
    expect(big_tournament.num_rounds).to eq(15)
  end

  it "shows completion" do
    incomplete_tournament = FactoryGirl.build(
      :tournament,
      double_elim: true,
      results: "[[[[2,1],[2,1],[2,0],[1,2]],[[null,null],[null,null]],[[null,null]]],[[[null,null],[null,null]],[[null,null],[null,null]],[[null,null]],[[null,null]]],[[[null,null],[null,null]]]]"
    )
    complete_tournament = FactoryGirl.build(
      :tournament,
      max_teams: 16,
      results: "[[[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1],[2,1],[2,1]],[[2,1],[2,1]],[[2,1],[1,2]]]]"
      )
    expect(tournament.completion).to eq(0)
    expect(incomplete_tournament.completion).to eq(26)
    expect(complete_tournament.completion).to eq(100)
  end
end
