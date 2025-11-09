# Typescript Battlesnake Project

[![Run on Replit](https://repl.it/badge/github/BattlesnakeOfficial/starter-snake-typescript)](https://replit.com/@Battlesnake/starter-snake-typescript)

## Technologies Used

This project uses [TypeScript](https://www.typescriptlang.org/), [Node.js](https://nodejs.org/en/), and [Express](https://expressjs.com/). It also comes with an optional [Dockerfile](https://docs.docker.com/engine/reference/builder/) to help with deployment.

## Run Your Battlesnake

Install dependencies using npm

```sh
npm install
```

Start your Battlesnake

```sh
npm run start
```

You should see the following output once it is running

```sh
Running Battlesnake at http://0.0.0.0:8000
```

Open [localhost:8000](http://localhost:8000) in your browser and you should see

```json
{"apiversion":"1","author":"","color":"#888888","head":"default","tail":"default"}
```

## Play a Game Locally

* Download [compiled binaries here](https://github.com/BattlesnakeOfficial/rules/releases)
* Extract the binary in this folder.

Command to run a local game

```sh
# Command to start the snakes
npm run battlesnake:players <Number of Snakes>

# Command to start the server
npm run battlesnake:server <Number of Snakes>
```

## Next Steps

Continue with the [Battlesnake Quickstart Guide](https://docs.battlesnake.com/quickstart) to customize and improve your Battlesnake's behavior.

**Note:** To play games on [play.battlesnake.com](https://play.battlesnake.com) you'll need to deploy your Battlesnake to a live web server OR use a port forwarding tool like [ngrok](https://ngrok.com/) to access your server locally.
