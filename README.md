## AREA - Epitech Project 2021

## Purpose of the project
The goal of this project is to discover, as a whole, the software platform that we have chosen through the  
creation of a business application.  
To do this, we have implemented a software suite that functions similar to that of IFTTT and/or Zapier.  
This software suite is broken into three parts :  
•  An  **application server**  to implement all the features listed below (see  Features)  
•  A  **web client**  to use the application from your browser by querying the  application server  
•  A  **mobile client** to use the application from your phone by querying the  application server

The application offer the following functions :  
-  The user registers on the application in order to obtain an account  
-  The registered user then confirms their enrollment on the application before being able to use it
-  The application then asks the authenticated user to subscribe to  Services  
-  Each  service  offers the following components:  
	- type  Action  (see  Action Components)  
	-  type  REAction  (see  REAction Components)  
-  The authenticated user composes  AREA  by interconnecting an  Action  to a  REAction  previously con-  
figured
-  The application triggers  AREA  automatically thanks to triggers 

# Table of contents

 1. Team
 2. Requirements
 3. Usages
	 1. Server
	 2. Web application
	 3. Mobile application 
 4. API documentation swagger
 5. Database schema
 6. How it work
	 1. Server
	 2. Web
	 3. Mobile application
 7. User manual
	 1. Web app
	 2. Mobile application

# Team

 - Arthur Jourdan : Back-end developer
 - Aurélien Joncour : Back-end developer
 - Simon Racaud : Back-end developer, Documentation
 - Sullivan Geslot : Pro mobile flutter developer
 - Vincent Andrieu : Full-Stack developer

# Requirements
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

# Usages

You should complete the ```server/.env``` file with all the api keys.

To start the program, run at the root of the project:
> docker-compose up

To stop
> docker-compose down

That will start the back-end, the web app and build an apk for the mobile application.

## API documentation swagger

![about](/doc/app-about.png)
![Auth](/doc/auth.png)
![user-area-service-config](/doc/user-area-service-config.png)

## Server
Start manually
> cd server && npm run start

You will also need to run a database mongo db version 4.4

### Tests
> cd server && npm run test

### Documentation
After starting the server. Go to http://localhost:8080/api-docs/ to see the Swagger documentation.
That documentation describe the endpoints of the API.

## Web application
Start manually
> cd web && npm run start

## Mobile application
TODO

# Database schema
Tables:
- Action
- Area
- Reaction
- User

## Action

    {
	    type: string 			# Type name of the action ex: "CRON" 
	    parameters: [{			# Parameter list
				name: string			# Field name ex: "timestamp"
				label: string			# Label to display ex: "Timestamp"
				type: string			# Type of the parameters ex: "TEXT" or "DATE"
			}]
			service: string 	# Name of the service ex: "GITHUB"
		}
## Reaction

    {
	    type: string		# Type name of the reaction ex: "TWITTER_BANNER"
	    parameters: [{			# Parameter list
				name: string			# Field name ex: "timestamp"
				label: string			# Label to display ex: "Timestamp"
				type: string			# Type of the parameters ex: "TEXT" or "DATE"
			}]
			service: string 	# Name of the service ex: "TWITTER"
    }
   ## Area
 
    {
			trigger: {
				inputs: ActionConfig 		# Data structure to configure the action
				action: Action				# cf: Action table
				outputs: Action Result		# Data structure to stock contextual data if needed
			}
			consequence: {
				inputs: ReactionConfig		# Data structure to configure the reaction
				reaction: Reaction			#	cf: Reaction table
			}
    }
## User

    {
	    username: string
	    password: string
	    token: string		# OAuth token or jwt token
	    areas: array(Area)	# List the area owned by the user (cd: area table)
	    oauth: { 			# OAuth2 : stock the token of each service to access their API 
			twitter: Data structure
	        github: Data structure
	        discord: Data structure
	        dropbox: Data structure
	        notion: Data structure
	        twitch: Data structure
	        twitter: Data structure
	        linkedin: Data structure
	        unsplash: Data structure
		}
    }

# How it work

## Server

#### Main sections of the program:
- Initialisation
-  Area API CRUD
- Action/Reaction CRON
- Auth API endpoints

### Initialisation
At the beginning, Express and the whole API start. After that, we initialize the database. If the tables Action or Reaction are missing, we create and fill them with the standard dataset (cf: /server/src/dataset/*.json).
At the end, we start the Action/Reaction CRON service. (cf: following paragraph)

### Area API CRUD
There are 5 endpoints to Create, Read one, Read all, Update and Delete user's areas.
More information about those endpoints in the Swagger documentation (cf: Usages part)

### Action/Reaction CRON
The purpose of that module is to detect when an event occur (ex: a message is posted on github) and to trigger the associated reaction.  
By default, the CRON run every minute. The actions of each user are evaluated one after another.

The schedule of the CRON can be configured through an API endpoint (cf: swagger documentation)  

### Auth API endpoints
There are several endpoints used of the authentication of the users.
The endpoints */auth/register* and */auth/login* allow the user of join the application with an email and a password.
There are also several endpoints used to register or login the user on the application through the OAuth2 of other services. A new time, the swagger documentation define which endpoints are available.

## Services
### Our services are the following:
- Github
	- Action: When a new pull request is created
	- Action: When a new issue is created
	- Reaction: Create a new issue
	- Reaction: Create a new pull request
- Notion
	- Reaction: Append a text in a page.
- Discord
	- Action: When a new message is posted in a channel
	- Reaction: Post a new message in a channel
- Twitter
	- Action: When an user post a new tweet
	- Reaction: Post a new tweet
	- Reaction: Update the banner of the account
	- Reaction: Update the profile picture of the account
- Twitch
	- Action: When a streaming is on live
- Dropbox
	- Reaction: Upload a file
- RSS
	- Action: When a stream is updated.
- Time
	- Action: When a specific timestamp is reached
	- Action: When a CRON schedule condition is true
- Unsplash
	- Action: When an user post a new picture
	- Action: Get a random post

# User manual

## Web app

![start](/doc/web_start-page.png)
![login](/doc/web_login-page.png)
![register](/doc/web_register_page.png)
![home](/doc/web_home_page.png)
![settings](/doc/web_settings_page.png)
![create](/doc/web_create_page.png)
![create](/doc/web_create_page_2.png)
![edit](/doc/web_edit_page.png)

## Mobile app
