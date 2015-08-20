Rails.application.routes.draw do
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: { format: :json } do
    resources :tournaments, only: [:index, :show, :create, :update, :destroy]
    resources :teams, only: [:index, :show, :create, :update, :destroy]
    resources :registrations, only: [:index, :show, :create, :destroy]
    resources :follows, only: [:index, :show, :create, :destroy]
    resources :team_memberships, only: [:index, :show, :create, :destroy]
    resources :images, only: [:index, :show, :create, :update, :destroy]
  end

  root to: "static_pages#root"
end
