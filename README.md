# Dots

A forum platform for building discussion communities , with a rich set of features. Built using React, Ruby on Rails and MongoDb.

## Features

* Active timeline that fetches all new updates from all communities you follow or most interesting stuff on the platform if not signed in
* Users operations including sign up/in , mail verification and update / delete profile
* Users can create communities , posts and <s>tags</s>
* Users also can comment / rate other discussions and comments  
* Users can report posts, comments , communities and other users 
* Admin can register moderators for the platform
* Moderators have more actions like ban users , close communities and delete posts
* Users can search for posts , communities and people
* Tags are additional feature that can group posts
* Notifications for the users about new comments on their posts / comments

## Requirements

* Node.js
* Ruby 
* MongoDb
* Redis

The first 2 requirements should be installed locally on you machine ,
as for the databases , it could also be installed locally on your machine , or could use the provided `compose.yaml` file, to run them using Docker. and in this case make sure that Docker is installed on your machine.

*Please Note : Work still in progress and in future the entire application will be dockerized*

## Database Configuration

Dots uses 2 types of databases a MongoDb as a primarily database , and Redis for caching (In progress). You could either install those 2 databases locally , or if you already have them on machine.

An alternative solution is to use the provided `compose.yaml` file which will install the required databases in addition to MongoExpress to mange the MongoDb database.

Inside `docker/` directory , you will find `compose.yaml` and `.env.example` , so in order to run docker compose , you first need to create the `.env` file and edit the configuration:

```
cd docker
cp .env.example .env
```

Once you run those 2 commands , open the `.env` file in your editor of choice and feel free to update the default credentials :

```
# Mongo DB
MONGO_INITDB_ROOT_USERNAME="root"
MONGO_INITDB_ROOT_PASSWORD="root"

# Mongo Express
ME_CONFIG_MONGODB_ADMINUSERNAME= "admin"
ME_CONFIG_MONGODB_ADMINPASSWORD= "admin"
```

And of course you could also open the `compose.yaml` and feel free to update any of the services options.

Once you are done with the `.env` file , start the docker compose :

```
docker-compose -f compose.yaml up -d
```

Then you can check if everything is running , using :

```
docker ps
```

## FrontEnd Installation

For the frontend side , we have a basic React application , so in the root of the application , run the following commands to install the dependencies :

```
cd frontend/
npm install
```

Then you have to create the `.env` , by running the following command :

```
cp .env.example .env
```

There's no need edit the `.env` file , it just contains the URL for the backend.

Finally to run start the app , run :

```
npm start
```

## BackEnd Installation

On the backend side , we start by creating the `.env` file , which will contain the credentials and other info for the database and maybe other stuff in future.

```
cd backend/
cp .env.example .env
```
And don't forget to update the `.env` file , in case you have different database credentials than the default ones.

Then all required dependencies using :

```
bundle install
```

Once the installation is done , start the backend server using :

```
bin/rails server -p 5000
```

## Migration and Seeds

Once the backend is installed successfully and everything is running , you could use the migration and seeds scripts to create the collections and seed the database.

To use those scripts , inside of `backend/` directory , run the following command :

```
rails runner db/migrate.rb
```
And once the migration is done , start seeding :

```
rails runner db/seed.rb
```

## Running the application

By default the react application runs on port 3000 and the backend on port 5000.

2 APIs collections (Thunder client / Postman) are provided in the `collections/` directory , so make sure to check those , to get better understanding of the APIs.

Finally , open your browser and in the search bar type :

```
http://localhost:3000/
```

You should now see Dots homepage.

## License

(Dots) released under the terms of the MIT license.