class SongsController < ApplicationController

  before_action :authenticate_user!, :except => [:index]

  respond_to :html, :json

  def index

    @song = Song.all
    @song << current_user
    respond_with(@blah) do |format|
      format.json { render :json => (@song).as_json }
      format.html
    end

    # @user = current_user
    # respond_with(@users) do |format|
    #   format.json { render :json => @user.json }
    # end

  end
end
