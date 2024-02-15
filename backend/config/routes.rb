Rails.application.routes.draw do
  get 'up' => 'rails/health#show', as: :rails_health_check

  scope '/api/v1' do
    # Public Routes
    root 'public#home',   as: 'public_home'
    get  '/search',       to: 'public#search', as: 'public_search'
    get  '/pages/:title', to: 'public#page',   as: 'public_page'
    
    
    # Auth Routes
    scope '/auth' do
      post '/sign-in', to: 'auth#sign_in', as: 'auth_sign_in'
      post '/sign-up', to: 'auth#sign_up', as: 'auth_sign_up'
    end
    
    # Users Routes
    scope '/users' do
      get '/profile',       to: 'users#profile',        as: 'users_profile'
      put '/profile',       to: 'users#update_profile', as: 'users_update_profile'
      get '/notifications', to: 'users#notifications',  as: 'users_notifications'
      get '/communities',   to: 'users#communities',    as: 'users_communities'
      
      scope '/avatar' do
        put    '/', to: 'users#update_avatar', as: 'users_update_avatar'
        delete '/', to: 'users#delete_avatar', as: 'users_delete_avatar'
      end
    end
    
    # Communities Routes
    scope '/communities' do
      post   '/',      to: 'communities#create', as: 'communities_create'
      put    '/',      to: 'communities#update', as: 'communities_update'
      delete '/',      to: 'communities#delete', as: 'communities_delete'
      post   '/join',  to: 'communities#join',   as: 'communities_join'
      post   '/leave', to: 'communities#leave',  as: 'communities_leave'
      
      scope '/logo' do
        put '/',    to: 'communities#update_logo', as: 'communities_update_logo'
        delete '/', to: 'communities#delete_logo', as: 'communities_delete_logo'
      end
    end

    # Posts Routes
    scope '/posts' do
      get    '/',       to: 'posts#show',   as: 'posts_show'
      post   '/',       to: 'posts#create', as: 'posts_create'
      put    '/',       to: 'posts#update', as: 'posts_update'
      delete '/',       to: 'posts#delete', as: 'posts_delete'
      get    '/list',   to: 'posts#list',   as: 'posts_list'
      post   '/rate',   to: 'posts#rate',   as: 'posts_rate'
      post   '/report', to: 'posts#report', as: 'posts_report'
      get    '/tags',   to: 'posts#tags',   as: 'posts_tags'
      
      scope '/banner' do
        put '/',    to: 'posts#update_banner', as: 'posts_update_banner'
        delete '/', to: 'posts#delete_banner', as: 'posts_delete_banner'
      end
    end
    
    # Comments Routes
    scope '/comments' do
      post   '/',       to: 'comments#create', as: 'comments_create'
      post   '/rate',   to: 'comments#rate',   as: 'comments_rate'
      delete '/',       to: 'comments#delete', as: 'comments_delete'
      post   '/report', to: 'comments#report', as: 'comments_report'
    end
  end
end
