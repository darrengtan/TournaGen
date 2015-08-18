class Api::TeamMembershipsController < ApplicationController
  def index
    @team_memberships = TeamMembership.includes(:team, :user)
  end

  def show
    @team_membership = TeamMembership.includes(:team, :user).find(params[:id])
  end

  def create
    @team_membership = current_user.team_memberships.new(team_membership_params)
    if @team_membership.save
      render json: @team_membership
    else
      render json: @team_membership.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @team_membership = TeamMembership.find(params[:id])
    @team_membership.destroy!
    render json: @team_membership
  end

  private
  def team_membership_params
    params.require(:team_membership).permit(:team_id)
  end
end
