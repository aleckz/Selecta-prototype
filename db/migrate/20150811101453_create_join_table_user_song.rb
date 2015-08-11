class CreateJoinTableUserSong < ActiveRecord::Migration
  def change
    create_join_table :users, :songs do |t|
      # t.index [:user_id, :song_id]
      # t.index [:song_id, :user_id]
    end
  end
end
