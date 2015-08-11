class Api::TournamentsController < ApplicationController
  def index
    @tournaments = Tournament.all
    render :index
  end

  def show
    @tournament = Tournament.find(params[:id])
    render :show
  end

  def create
    @tournament = Tournament.new(tournament_params)
    @tournament.author_id = current_user.id
    if @tournament.save
      render :show
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @tournament = Tournament.find(params[:id])
    @tournament.destroy!
    render json: {}
  end

  private
  def tournament_params
    params.require(:tournament).permit(:title, :description)
  end
end
