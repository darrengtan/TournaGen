class Api::RegistrationsController < ApplicationController
  def index
    @registrations = Registration.all
  end

  def show
    @registration = Registration.find(params[:id])
  end

  def create
    @registration = Registration.new(registration_params)
    @registration.team_id = current_user.owned_team.id
    if @registration.save
      render json: @registration
    else
      render json: @registration.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @registration = Registration.find(params[:id])
    @registration.destroy!
    render json: {}
  end

  private
  def registration_params
    params.require(:registration).permit(:tournament_id)
  end
end
