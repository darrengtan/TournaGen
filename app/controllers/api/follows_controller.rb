class Api::FollowsController < ApplicationController
  def index
    @follows = Follow.includes(:tournament, :follower)
  end

  def show
    @follow = Follow.includes(:tournament, :follower).find(params[:id])
  end

  def create
    @follow = current_user.follows.new(follow_params)
    if @follow.save
      render json: @follow
    else
      render json: @follow.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy!
    render json: @follow
  end

  private
  def follow_params
    params.require(:follow).permit(:tournament_id)
  end
end
