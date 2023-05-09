# Welcome to my the Poetry_API

## Table of Contents
* [Introduction](#introduction)
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Screenshots](#screenshots)
* [Usage](#usage)
* [Authentication](#authentication)
* [Error handling](#error-handling)
* [Contact](#contact)
<!-- * [License](#license) -->


## Introduction
- This is a basic build for an API with Poems to set up a website in which they can be used for cultural purposes.

## Prerequisites
- An IDE like VS code to open the files and read the code.
- Terminal to run the scripts
- A databasemanagement system (e.g.: TablePlus)


## Installation
- In case of running the API, please go to the folder in which you stored the files.
- Next use npm init to initiate the project
- Install the following dependencies:
    - express
    - cors
    - dotenv
    - mariadb
    - nodemon
- Add a script in your package.json file to called "dev" and make it run "nodemon server.js".


## Screenshots
![Screenshot]()
<!-- If you have screenshots you'd like to share, include them here. -->


## Usage

Go into your terminal and run the script we just added in the installation.
'npm run dev'
The terminal should now give the localhost link in which it will open in your browser.
You can now follow the instructions from the browser.

## Authentication

Authentication works with users and admins. There is CRUD for the users table. BUT, only the admin can have access to the full READ of the CRUD.
We are using a bcrypt package in the usersController to hash the password in which later we will also use the unique value of the email to authenticate the user or admin.

## Error handling


## Contact
Created by [Raoul Vandevelde](https://github.com/RalloField) - feel free to contact me!


<!-- Optional -->
<!-- ## License -->
<!-- This project is open source and available under the [... License](). -->

<!-- You don't have to include all sections - just the one's relevant to your project -->
