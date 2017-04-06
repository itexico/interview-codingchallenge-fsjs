# To run:

Make sure you have node.js (https://nodejs.org/en/ ) and git (https://git-scm.com/downloads) installed.

## the first time you install the project:

open up a new administer terminal at proyect root, type the following commands  :

    npm install jspm live-server -g      // install jspm globally  
    cd src/client                        //change to client folder
    jspm update                          // make sure you have all the jspm packages installed
    live-server --open=app               //since you already in client folder, launch app

leave that terminal running and open up a new one inside the project root. type:

    npm install                          //install al dependencies for server
    node src/server/server.js            //run server 

## Any other time after install

In a terminal at project root type

    node src/server/server.js                 //run server
    
Leave that running and in another window type
    
    live-server --open=src/client/app        //launch front end
    


    






======================================================

# Let's code some JS!

Hey, welcome to the first coding challenge of your interview process, you'll be presented with a set of steps to accomplish in order to get yourself graded on

> Fullstack JavaScript using the MEAN stack

## The Prereqs
This challenge assumes your knowledge or skills to leverage on the following topics,

  - Vanilla JavaScript (or plain JavaScript)
  - NodeJS
  - Express
  - MongoDB
  - Mongoose (or another nodejs based ORM for mongodb)
  - RESTful APIs, webservices
  - A client side MV* framwork or library (Angular1, Angular2, React(not an mvc, tho) )
  - Code quality and testing

## The rules

This challenge is not set by any hard rule regarding time or style, although both will play key factors on your assessment, yet, here are some rules because... rules

  * You have to fork this project and work on your copy of the code for this to work
  * You must create a commit per step of the challenge finished, wether you want to push it or not is up to you
  * You have to open a pull request to the original repo once you feel your code is ready, for your code to be assessed
  * You are not limited to the set of tools listed on **The prereqs**, you can use any additional tools you feel or know will aid you on your quest
  * You don't need to complete the whole challenge to create a pull request, if you get stuck at some point, create the pull request and write your issues in the comments

## The challenge

You will be creating a simple server-client application so common nowadays, using the MEAN stack, the requirements are as follows.

  - As an individual,
    - I need a way to create lists of my favorite stuff ( so cliche, right? ) so, several lists of different stuff (books, movies, stores, pizza flavors, whatevs...)
    - I need a way to add, edit, and delete items on such lists
    - I need a way to view the lists I create
  - As a developer,
    - I need the node_modules to be ignored by git
    - I need to be able to access the CRUD capabilities of the lists through a RESTful API, json based, from external domains
    - I need schemas ( mongoose preferred ) for the Lists and Items entities
    - I need an exposed CRUD API to affect the Lists and Items entities using the correct HTTP verbs for each
      - Create, update, remove, fetch all and fetch by id should be supported for lists and items (10 endpoints total)
    - I need middleware to happen on each request validating that the user has a cookie named "auth" or not (log the value to output, we are not managing authentication of any kind just yet)

    - I need a test suit testing the endpoints
    - I need a test suit testing the middleware covering the cases where the user has a cookie named "auth", a cookie with another name or no cookie at all


## The small print

Stuff that will be graded

    Logic and code complexity   ( How easy will my code be to maintain by someone else? Am I using good practices and/or design patterns? )
    Code coverage               ( Is my code tested? Are all scenarios considered? )
    Requirement coverage        ( Is the application doing what it is meant to be doing? )
    Rule compliance             ( Did i follow the few rules set on **The rules** ? )
