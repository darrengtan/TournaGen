class AddMaxTeamsToTournaments < ActiveRecord::Migration
  def change
    add_column :tournaments, :max_teams, :integer
    change_column :tournaments, :max_teams, :integer, null: false
  end
end
