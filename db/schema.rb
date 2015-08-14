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

ActiveRecord::Schema.define(version: 20150814172211) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "registrations", force: :cascade do |t|
    t.integer  "tournament_id", null: false
    t.integer  "team_id",       null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "registrations", ["team_id"], name: "index_registrations_on_team_id", using: :btree
  add_index "registrations", ["tournament_id", "team_id"], name: "index_registrations_on_tournament_id_and_team_id", unique: true, using: :btree
  add_index "registrations", ["tournament_id"], name: "index_registrations_on_tournament_id", using: :btree

  create_table "teams", force: :cascade do |t|
    t.integer  "owner_id",    null: false
    t.string   "name",        null: false
    t.text     "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "teams", ["owner_id"], name: "index_teams_on_owner_id", using: :btree

  create_table "tournaments", force: :cascade do |t|
    t.integer  "author_id",                null: false
    t.string   "title",                    null: false
    t.text     "description",              null: false
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "max_teams",                null: false
    t.integer  "results",     default: [],              array: true
  end

  add_index "tournaments", ["author_id"], name: "index_tournaments_on_author_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
