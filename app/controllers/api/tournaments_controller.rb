class Api::TournamentsController < ApplicationController
  def index # allow infinite scrolling with kaminari
    @page_number = params[:page]
    if params[:type] == "follow"
      @tournaments = Tournament.inclusion
                               .references(:follows)
                               .where(
                                 "follows.follower_id = ?",
                                 current_user.id
                               ).page(@page_number)
    elsif params[:type] == "host"
      @tournaments = current_user.tournaments.includes(
        {registrations: [:team, :tournament]},
        :author,
        follows: [:follower, :tournament]
      ).page(@page_number)
    elsif params[:search]
      @tournaments = Tournament.search(params[:search]).page(@page_number)
    else
      @tournaments = Tournament.inclusion.page(@page_number)
    end
  end

  def show
    @tournament = Tournament.inclusion.find(params[:id])
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
