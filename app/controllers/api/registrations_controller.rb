class Api::RegistrationsController < ApplicationController
  def index
    @registrations = Registration.all
  end

  def show
    @registration = Registration.find(params[:id])
  end

  def create
    @registration = Registration.new(registration_params)
    if @registration.save
      render json: @registration
    else
      render json: @registration.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @registration = Registration.find(registration_params)
    @registration.destroy!
    render json: {}
  end

  private
  def registration_params
    params.require(:registration).permit(:tournament_id, :team_id)
  end
end
