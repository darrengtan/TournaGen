class Api::TournamentsController < ApplicationController
  def index # allow infinite scrolling with kaminari
    if params[:type] == "follow"
      @tournaments = Tournament.inclusion
                               .references(:follows)
                               .where(
                                 "follows.follower_id = ?",
                                 current_user.id
                               ).page(params[:page])
    elsif params[:type] == "host"
      @tournaments = current_user.tournaments.includes(
        {registrations: [:team, :tournament]},
        :author,
        follows: [:follower, :tournament]
      ).page(params[:page])
    elsif params[:search]
      @tournaments = Tournament.search(params[:search]).page(params[:page])
    else
      @tournaments = Tournament.inclusion.page(params[:page])
    end
    respond_to do |format|
      format.html { render :index }
      format.json do
        # include completion for backbone collection
        # render json: {
        #   models: @tournaments.as_json(methods: [:completion, :seeds, :num_rounds]),
        #   page_number: params[:page],
        #   total_pages: @tournaments.total_pages
        # }
      end
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
