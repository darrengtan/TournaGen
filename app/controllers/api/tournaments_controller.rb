class Api::TournamentsController < ApplicationController
  def index
    if params[:type] == "follow"
      @tournaments = Tournament.includes(:registrations, :author, :follows)
                               .references(:follows)
                               .where(
                                 "follows.follower_id = ? AND author_id != ?",
                                 current_user.id,
                                 current_user.id
                               )
    elsif params[:type] == "host"
      @tournaments = current_user.tournaments.includes(:registrations, :author, :follows)
    elsif params[:search]
      @tournaments = (params[:search] == "" ? [] : Tournament.search(params[:search]))
    else
      @tournaments = Tournament.includes(:registrations, :author, :follows)
    end
  end

  def show
    @tournament = Tournament.includes(:registrations, :author, :follows)
                            .find(params[:id])
  end

  def create
    @tournament = current_user.tournaments.new(tournament_params)
    @tournament.results = "[]"
    if @tournament.save
      render :show
    else
      render json: @tournament.errors.full_messages,
                     status: :unprocessable_entity
    end
  end

  def update
    @tournament = Tournament.find(params[:id])
    params[:tournament][:results] ||= []
    params[:tournament][:results] = JSON.generate(params[:tournament][:results])

    if @tournament.update(tournament_params)
      render :show
    else
      render json: @tournament.errors.full_messages,
                     status: :unprocessable_entity
    end
  end

  def destroy
    @tournament = Tournament.find(params[:id])
    @tournament.destroy!
    render json: @tournament
  end

  private
  def tournament_params
    params.require(:tournament).permit(
      :title,
      :description,
      :max_teams,
      :results,
      :double_elim
    )
  end
end
