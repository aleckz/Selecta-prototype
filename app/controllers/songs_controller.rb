class SongsController < ApplicationController

  before_action :authenticate_user!, :except => [:index]

  respond_to :html, :json

  skip_before_filter  :verify_authenticity_token

  def index
    # respond_with do |format|
    #   format.json { render :json => {soundcloud_id: '123'} }
    #   format.html
    # end
  end

  def show
    @newsong = 'hello'
    respond_to do |format|
      format.json { render :json => {soundcloud_id: @newsong}}
      format.html
    end
  end

  def create
    @usersong = current_user.songs.create(soundcloud_id: song_params)
    if @usersong.save
      render json: { :success => true }
    end
  end

  def find
    @oldsong = Song.find_by(soundcloud_id: song_params)
    @newsong = '12345678'
    render :json => { song: @newsong.as_json }
  end






private

  def song_params
    params.require(:soundcloud_id)
  end

end
