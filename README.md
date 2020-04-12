# AssetManagementSystemAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.0.3.

# Requirements 

To run this project you need 
* angular-cli
> npm install -g @angular/cli

* [json-server](https://www.npmjs.com/package/json-server)
Run

> npm install -g json-server

to install json-server using npm.

# Running the application

Inside /for json-server directory you will find db.json file.

**Copy this file into a folder outside of your angular working directory.** (This is important because if you keep the file inside angular working directory the development server will reload whenever a change is made in the db.json file).

from this directory run json-server using

> json-server --watch db.json

Check if json-server is running by going to 'http://localhost:3000' from your browser.

Start the application by running

> ng serve

From the root of your angular working directory

Go to 'http://localhost:4200' 

You will see the home screen and you can start using the application.

Find the login credentials in db.json file.

# Note

Each time you close the application make sure your remove all the requests and assets your added during that run of the application from the 
db.json manually.
This is because the id for requests and asset is generated using a variable whose intial value is reset during each run of the application.






