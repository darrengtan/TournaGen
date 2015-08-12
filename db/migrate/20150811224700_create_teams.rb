class CreateTeams < ActiveRecord::Migration
  def change
    create_table :teams do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false
      t.text :description
      t.timestamps null: false
    end

    add_index :teams, :owner_id
  end
end
