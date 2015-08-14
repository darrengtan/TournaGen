class AddResultsToTournaments < ActiveRecord::Migration
  def change
    add_column :tournaments, :results, :integer, array: true, default: []
  end
end
