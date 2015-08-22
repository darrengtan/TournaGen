class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by_credentials(params[:user][:credential], params[:user][:password])
    if @user
      log_in(@user) # redirect to static pages in log_in method
    else
      flash.now[:errors] = ["Invalid email or password"]
      render :new
    end
  end

  def destroy
    @user = User.find_by_session_token(session[:session_token])
    log_out!(@user)
    render json: {};
  end
end
