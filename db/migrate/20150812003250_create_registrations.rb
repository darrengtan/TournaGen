class CreateRegistrations < ActiveRecord::Migration
  def change
    create_table :registrations do |t|
      t.integer :tournament_id, null: false
      t.integer :team_id, null: false
      t.timestamps null: false
    end

    add_index :registrations, :tournament_id
    add_index :registrations, :team_id
    add_index :registrations, [:tournament_id, :team_id], unique: true
  end
end
