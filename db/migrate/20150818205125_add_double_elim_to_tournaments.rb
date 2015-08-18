class AddDoubleElimToTournaments < ActiveRecord::Migration
  def change
    add_column :tournaments, :double_elim, :boolean, default: false
  end
end
