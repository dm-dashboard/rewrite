# DM Dashboard

![Build Status](https://circleci.com/gh/dm-dashboard/rewrite.png?style=shield)

A highly customizable dashboard used to radiate important information to interested people.

This is a group up rewrite of [this dashboard](https://github.com/dm-dashboard/dashboard) building on the lessons learnt from building and using it. It is written using TypeScript 2, Angular 2 and no mean.io dependancy.

Although originally built for software development teams, there is nothing stopping it's use in other industries and areas.

## Features 
**Note: Not all of these features have been ported across to the new version yet**

1. Centralized server that does all the grunt work of talking to other systems
2. Browser based clients with always up connection to the server with push updates
2. Customizable dashboards that allows placement of rectangular widgets as you see fit
2. Multiple pages per dashboard, will cycle through them on a customizable interval
3. Multiple dashboards, can have various clients each viewing their own dashboards
4. Broadcasts: Force specified clients to display a temporary dashboard to broadcast a message for a set time period (This feature is still a work in progress)
5. Client control dashboard allowing remote control of connected clients machines, allowing you to identify them, change their active dashboard or force-reload them.
6. Plugin architecture - Endless possibilities. If you have a system that exposes an API, it can be added to your dashboard with a custom plugin.

## Architecture

The core system is a node backend connected via web sockets to an Angular frontend. 

MongoDB is used to store configuration and is also available to plugins for storage of their own data.

Actual monitoring and display is handled by plugins consisting of a backend node script and a custom Angular component.

There are no plugins installed by default, however the following are available in the plugins repo under the dm-dashboard org:
* Teamcity (designed specifically to keep an eye on multiple projects and in the process of being ported across)
    * Show a history of recent builds across all projects with failed builds floating to the top
    * A list of currently executing builds
    * Build agent queues
    * Some stats of successfull/failed builds over the past day/week/month
* Octopus Deploy (Still to be ported)
    * Show details of the most recent deploy for a project
* Client Only (Various widgets that don't require a server side component)  (Still to be ported)
    *  Display an image
    *  Play a Youtube video
    *  Display an iFrame
*  Others that cannot be released due to their company specific natures but doing the following:
    * Communicate over ZeroMQ with a Windows GUI app
    * Consume a client .net API using [edge.js](http://tjanczuk.github.io/edge/)
    * Experimental Microsoft TFS plugin

Some goals for this rewrite:

- [X] Upgrade to Angular 2
- [X] Remove the dependency on mean.io, it was helpful to get plugability quickly during the origianl contest, but it also contains a lot of overhead and unnecessary complexity. I think a plain old node/express (or some other backend framework) with custom plugin code would be much easier to maintain
- [X] Upgrade to a new version of node
- [X] Remove the need to check-in the node_modules folder, this is partly due to the age of the system as some of its indirect dependencies (via mean.io) have changed substantially and a fresh install would break the system.
- [ ] Much simpler installation process that doesn't require a git clone
- [ ] Lightweight client (less Javascript and animations) option for Raspberry Pi type clients connected to TVs 


If you find it useful, please consider contributing to modernizing it and getting it cleaned up and easier to maintain.

## Installation Instructions

### Prequisites
1. Node v6.9.5 or later
1. MongoDB v3 or greater
1. The dashboard will run on Windows or Linux, though a Linux installation may be easier

### To Install
1. Clone the git repo onto the destination server
  * ``` git clone git@github.com:dm-dashboard/rewrite.git ```
1. Change into the checkout folder
1. ```npm install``` OR ```yarn```
1. install forever.js
  * Forever allows you to run a node script in the background and auto restarts it if it crashes
  * ``` npm install -g forever```
1. Before we start the server, we will need to configure it for your environment

### To Configure
1. Change to the checkout folder
1. Open config/default.json
  1. Update the "db" property to point to your mongo DB
  1. Save and close the file

### Installing Plugins
1. Plugins are installed via NPM, more to follow
  
### To start everything up
1. Change to the checkout folder
1. Run the following:
    * ```forever start bin/index.js``` 
1. You will see forever starting the node process and then it returns you to the console.
1. To see what forever is currently managing
    * ```forever list```
1. To kill the dashboard process
    * ```forever stop server.js```
    * OR
    * ```forever stop 0```  
1. Open your browser and navigate to 
    * ```http://[path_to_where_you_deployed]:4000```     
  
### Initial Setup
1. Create a dashboard...TODO
1. Configure plugins...TODO
2. Writing your own plugin ...TODO

