# Connect 4

## Getting Started

Hey there, Welcome to the Connect 4 game made as a project for AWD module. In this repository you will find all the necessary files to run the application.
The game Connect4 was developed by a group of students at Darmstadt University of Applied Sciences as part of the block course 'Advanced Web Development' in SS 2021.
Project Developers:
- Nikita Fabian Bogutzk
- Joseph Acosta-Becker
- Felix Clemens Karl Christians
- Lavinia Mihut
- Haythem Trabelsi 

## Tech/framework used
- React
- Express
- Node
- MySQL
- REST

## Motivation
Our Motivation in this project was to overcome the classic rule of Connect 4 of having set rules. Therefore we decided to implement this game with the advantages that in our game  you can adjust the size of the playing field as you like, so that the joy of playing can never be lost.

### Requirements
This application is based on docker, therefore you need to install docker locally. Take a look under this link on how to do that. https://docs.docker.com/get-started/

you can start the whole project with `docker-compose up -d` and you will find the project under `http://localhost:3000`

### Installation with Docker

- Go to the `frontend`-folder and install all the requirements with

```bash
npm install
```

- Go to the `backend`-folder and install all the requirements with

```bash
npm install
```

- Go to the initial folder and start the Frontend/Backend/Database with

```bash
docker-compose up -d
```

### Updating the schema of the database

```bash
docker-compose exec backend bash
npm run typeorm schema:drop # Deletes the current schema
npm run typeorm schema:sync # Creates a schema based on your data
```

### Now you can start the application.

## Project Functionality

#### Starting the application
- Go to the initial folder and start the Frontend/Backend/Database with

```bash
docker-compose up 
```
The frontend of this project is accessible under `http://localhost:3000`.
Upon entring this URL you will find the first page which is the login/Register page. 
### Pages
#### Login/Register Page
Upon accessing the login page you will have to register as a user in order to be able to play the game.
This page is also accessible under `http://localhost:3000/login`.
#### Dashboard Page
After logging in you will be directed to the dashboard page, in which you will find the following features
- Played Games
    - In this section you will find the history of all the games that you have played in the past.
- Profile
    - In this section you will find your Elo Score, how many games you've won and lost.
- Leaderboard
    - In this section you will find a leaderboard of players that exist in the Database.

This page is also accessible under `http://localhost:3000/dashboard`
#### New Game Page
After you click the button `Next Game` in Dashboard you will be directed to the new game page.
In this page you can specify the preferred settings that you want to play the game with such as :
- Board Width
- Board Length
- Row count to win
- Time in minutes
- Rated

Afterwards you can create a room for the game and wait until an opponent comes. you can do this by clicking `Create Game Session`.
Otherwise you can see all the available rooms and choose one of them unless there is more than two players in the room.
When you have already chosen a room you can find all the details regarding that room on the `Game Room Details` section on the right.
After choosing a room you can join this room to play by clicking the `Join as Player` button.
This page is also accessible under `http://localhost:3000/newgame`.
#### Game Page 
After choosing your preferred settings and joining a room you will be directed to the main page of this project, which is the game page.
In this page you can actually play the game against an opponent along with communicating with him through the chat box.
It is also possible to redo some moves with the help of the buttons on the bottom. 
Additionally you can resign your turn or give up on the game and go back to the dashboard using the buttons `Resign` and `Back to Dashboard`

#### Settings Page
In this page you have the ability to either change your name or to change the theme of the website.
There are two available themes `Dark Theme` and `Light Theme`.
This page is also accessible under `http://localhost:3000/settings`.

#### Navigation List
In every page of this website there is a navigation list on the left with which you can access all the available pages. and most importantly you can logout of the website by clicking `Logout`.

#### Help Page

This page is also accessible under `http://localhost:3000/help`.

## Code Example

## Screenshots

## License

MIT © 

















