class ChangeTournamentsResultsToJson < ActiveRecord::Migration
  def change
    change_column :tournaments, :results, :text
  end
end
