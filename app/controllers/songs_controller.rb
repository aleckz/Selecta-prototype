class SongsController < ApplicationController

  before_action :authenticate_user!, :except => [:index]

  respond_to :html, :json

  skip_before_filter  :verify_authenticity_token

  def index
    @song = Song.all
    @user = current_user
    respond_with do |format|
      format.json { render :json => {song: @song, current_user: @user} }
      format.html
    end
  end

  def show
    @song = Song.where(soundcloud_id: song_params)
    respond_with do |format|
      format.json { render :json => {soundcloud_id: '123'} }
    end
    byebug
  end


  def create
    @usersong = current_user.songs.create(soundcloud_id: song_params)
    if @usersong.save
      render json: { :success => true }
    end
  end

  def find
    @oldsong = Song.find_by(soundcloud_id: song_params)

  end




private

  def song_params
    params.require(:soundcloud_id)
  end

end
