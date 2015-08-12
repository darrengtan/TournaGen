Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :tournaments, only: [:index, :show, :create, :update, :destroy]
    resources :teams, only: [:index, :show, :create, :update, :destroy]
  end

  root to: "static_pages#root"
end
