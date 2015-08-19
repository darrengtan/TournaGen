class ChangeTournamentResultsDefault < ActiveRecord::Migration
  def change
    change_column :tournaments, :results, :text, default: "[]"
  end
end
