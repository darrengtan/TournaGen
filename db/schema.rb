# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150820235621) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "follows", force: :cascade do |t|
    t.integer  "tournament_id", null: false
    t.integer  "follower_id",   null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "follows", ["follower_id"], name: "index_follows_on_follower_id", using: :btree
  add_index "follows", ["tournament_id", "follower_id"], name: "index_follows_on_tournament_id_and_follower_id", unique: true, using: :btree
  add_index "follows", ["tournament_id"], name: "index_follows_on_tournament_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.string   "url",            default: "https://res.cloudinary.com/dlrvqt6fn/image/upload/v1440114607/red_circle_tfcx2x.png"
    t.string   "thumb_url",      default: "https://res.cloudinary.com/dlrvqt6fn/image/upload/c_scale,h_150,w_150/v1440114607/red_circle_tfcx2x.png"
    t.integer  "imageable_id"
    t.string   "imageable_type"
    t.datetime "created_at",                                                                                                                         null: false
    t.datetime "updated_at",                                                                                                                         null: false
  end

  add_index "images", ["imageable_type", "imageable_id"], name: "index_images_on_imageable_type_and_imageable_id", using: :btree

  create_table "registrations", force: :cascade do |t|
    t.integer  "tournament_id", null: false
    t.integer  "team_id",       null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "registrations", ["team_id"], name: "index_registrations_on_team_id", using: :btree
  add_index "registrations", ["tournament_id", "team_id"], name: "index_registrations_on_tournament_id_and_team_id", unique: true, using: :btree
  add_index "registrations", ["tournament_id"], name: "index_registrations_on_tournament_id", using: :btree

  create_table "team_memberships", force: :cascade do |t|
    t.integer  "team_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "team_memberships", ["team_id", "user_id"], name: "index_team_memberships_on_team_id_and_user_id", unique: true, using: :btree
  add_index "team_memberships", ["team_id"], name: "index_team_memberships_on_team_id", using: :btree
  add_index "team_memberships", ["user_id"], name: "index_team_memberships_on_user_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.integer  "owner_id",    null: false
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "teams", ["owner_id"], name: "index_teams_on_owner_id", using: :btree

  create_table "tournaments", force: :cascade do |t|
    t.integer  "author_id",                   null: false
    t.string   "title",                       null: false
    t.text     "description",                 null: false
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.integer  "max_teams",                   null: false
    t.text     "results",     default: "[]"
    t.boolean  "double_elim", default: false
  end

  add_index "tournaments", ["author_id"], name: "index_tournaments_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "username"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
