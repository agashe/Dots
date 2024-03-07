Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check

  scope path: '/api/v1' do
    # Public Routes
    post  '/home',       to: 'public#home', as: 'public_home'
    post  '/search',       to: 'public#search', as: 'public_search'
    get   '/pages/:name', to: 'public#page',   as: 'public_page'
    
    # Auth Routes
    scope path: '/auth' do
      post '/sign-in', to: 'auth#sign_in', as: 'auth_sign_in'
      post '/sign-up', to: 'auth#sign_up', as: 'auth_sign_up'
    end
    
    # Users Routes
    scope path: '/users' do
      post '/timeline',       to: 'users#timeline',        as: 'users_timeline'
      get  '/profile',       to: 'users#profile',        as: 'users_profile'
      put  '/profile',       to: 'users#update_profile', as: 'users_update_profile'
      get  '/notifications', to: 'users#notifications',  as: 'users_notifications'
      get  '/communities',   to: 'users#communities',    as: 'users_communities'      
    end
    
    # Communities Routes
    scope path: '/communities' do
      post   '/',       to: 'communities#create', as: 'communities_create'
      put    '/',       to: 'communities#update', as: 'communities_update'
      post   '/delete', to: 'communities#delete', as: 'communities_delete'
      post   '/join',   to: 'communities#join',   as: 'communities_join'
      post   '/leave',  to: 'communities#leave',  as: 'communities_leave'
    end

    # Posts Routes
    scope path: '/posts' do
      post   '/',       to: 'posts#create', as: 'posts_create'
      put    '/',       to: 'posts#update', as: 'posts_update'
      post   '/delete', to: 'posts#delete', as: 'posts_delete'
      post   '/show',   to: 'posts#show',   as: 'posts_show'
      post   '/list',   to: 'posts#list',   as: 'posts_list'
      post   '/rate',   to: 'posts#rate',   as: 'posts_rate'
      post   '/report', to: 'posts#report', as: 'posts_report'
      get    '/tags',   to: 'posts#tags',   as: 'posts_tags'
    end
    
    # Comments Routes
    scope path: '/comments' do
      post   '/',       to: 'comments#create', as: 'comments_create'
      post   '/rate',   to: 'comments#rate',   as: 'comments_rate'
      post   '/delete', to: 'comments#delete', as: 'comments_delete'
      post   '/report', to: 'comments#report', as: 'comments_report'
    end

    # Assets Routes
    scope path: '/asset-files' do
      post    '/', to: 'assets#upload', as: 'assets_upload'
      delete  '/', to: 'assets#delete', as: 'assets_delete'
    end
  end
end
