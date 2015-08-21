class AddDefaultsToImages < ActiveRecord::Migration
  def change
    change_column :images, :url, :string, default: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440114607/red_circle_tfcx2x.png"
    change_column :images, :thumb_url, :string, default: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440114607/red_circle_tfcx2x.png"
  end
end
