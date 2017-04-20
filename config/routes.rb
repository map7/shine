Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'dashboard#index'

  # These supercede other /customers routes, so must come before resource :customers
  get "customers/ng", to: "customers#ng"
  get "customers/ng/*angular_route", to: "customers#ng#"
  # the *angular_route is called route globbing, meaning it can be anything and will be put into params.
  
  resources :customers, only: [:index, :show]
  get "angular_test" => "angular_test#index"
end
