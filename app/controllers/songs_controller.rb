class SongsController < ApplicationController

  before_action :authenticate_user!, :except => [:index]

  respond_to :html, :json

  def index
    @song = Song.all
    respond_with(@songs) do |format|
      format.json { render :json => @song.as_json }
      format.html
    end
  end

end
