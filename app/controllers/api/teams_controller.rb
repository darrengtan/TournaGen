class Api::TeamsController < ApplicationController
  def index
    if params[:search]
      @teams = (params[:search] == "" ? [] : Team.search(params[:search])).page(params[:page])
    else
      @teams = Team.inclusion.page(params[:page])
    end
    respond_to do |format|
      format.html { render :index }
      format.json do
        render json: {
          models: @teams,
          page_number: params[:page],
          total_pages: @teams.total_pages
        }
      end
    end
  end

  def show
    @team = Team.inclusion.find(params[:id])
  end

  def create
    @team = Team.new(team_params)
    @team.owner_id = current_user.id
    if @team.save
      Image.create!(imageable_id: @team.id, imageable_type: :Team)
      render :show
    else
      render json: @team.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @team = Team.find(params[:id])
    if @team.update(team_params)
      render :show
    else
      render json: @team.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @team = Team.find(params[:id])
    @team.destroy!
    render json: @team
  end

  private
  def team_params
    params.require(:team).permit(:name, :description)
  end
end
