class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :logged_in?

  private
  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !!current_user
  end

  def log_in(user)
    @current_user = user
    session[:session_token] = user.reset_token!
    redirect_to root_url
  end

  def log_out!
    current_user.reset_token!
    session[:session_token] = nil
    redirect_to new_session_url
  end

  def require_log_in!
    redirect_to new_session_url unless logged_in?
  end
end
