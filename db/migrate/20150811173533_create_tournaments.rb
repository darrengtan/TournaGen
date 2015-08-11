class CreateTournaments < ActiveRecord::Migration
  def change
    create_table :tournaments do |t|
      t.integer :author_id, null: false
      t.string :title, null: false
      t.text :description, null: false
      t.timestamps null: false
    end

    add_index :tournaments, :author_id
  end
end
