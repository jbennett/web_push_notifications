Rails.application.routes.draw do
  resources :posts
  resources :web_push_subscriptions, only: :create
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "posts#index"
end
