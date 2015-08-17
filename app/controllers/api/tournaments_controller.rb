class Api::TournamentsController < ApplicationController
  def index
    @tournaments = Tournament.includes(:registrations, :author, :follows)
  end

  def show
    @tournament = Tournament.includes(:registrations, :author, :follows).find(params[:id])
  end

  def create
    @tournament = current_user.tournaments.new(tournament_params)
    if @tournament.save
      render :show
    else
      render json: @tournament.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @tournament = Tournament.find(params[:id])
    if params[:tournament][:results]
      params[:tournament][:results] = JSON.generate(params[:tournament][:results])
    end

    if @tournament.update(tournament_params)
      render :show
    else
      render json: @tournament.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @tournament = Tournament.find(params[:id])
    @tournament.destroy!
    render json: @tournament
  end

  private
  def tournament_params
    params.require(:tournament).permit(:title, :description, :max_teams, :results)
  end
end
