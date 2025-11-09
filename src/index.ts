// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import {
  collide,
  findClosestFood,
  getDirection,
  getIntersection,
} from "./methods";
import runServer from "./server";
import {
  Coord,
  GameState,
  InfoResponse,
  Move,
  MoveKeys,
  MoveResponse,
} from "./types";

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info(): InfoResponse {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "", // TODO: Your Battlesnake Username
    color: "#888888", // TODO: Choose color
    head: "default", // TODO: Choose head
    tail: "default", // TODO: Choose tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState: GameState): void {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState: GameState): void {
  console.log("GAME OVER\n");
}

const possibleMoves: MoveKeys[] = ["up", "down", "left", "right"];

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState: GameState): MoveResponse {
  let isMoveSafe: Move = {
    up: true,
    down: true,
    left: true,
    right: true,
  };

  // We've included code to prevent your Battlesnake from moving backwards
  const myHead = gameState.you.body[0];
  const myNeck = gameState.you.body[1];

  if (myNeck.x < myHead.x) {
    // Neck is left of head, don't move left
    isMoveSafe.left = false;
  } else if (myNeck.x > myHead.x) {
    // Neck is right of head, don't move right
    isMoveSafe.right = false;
  } else if (myNeck.y < myHead.y) {
    // Neck is below head, don't move down
    isMoveSafe.down = false;
  } else if (myNeck.y > myHead.y) {
    // Neck is above head, don't move up
    isMoveSafe.up = false;
  }

  const boardWidth = gameState.board.width;
  const boardHeight = gameState.board.height;

  // Seeing if on border
  if (myHead.x === 0) isMoveSafe.left = false;
  else if (myHead.x === boardWidth - 1) isMoveSafe.right = false;

  if (myHead.y === 0) isMoveSafe.down = false;
  else if (myHead.y === boardHeight - 1) isMoveSafe.up = false;

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  const myBody = gameState.you.body;

  const safeDirections = collide(myHead, myBody);

  for (const direction of possibleMoves) {
    if (!safeDirections[direction]) isMoveSafe[direction] = false;
  }

  // Prevent your Battlesnake from colliding with other Battlesnakes
  const myName = gameState.you.name;
  const opponents = gameState.board.snakes.filter(
    (snake) => snake.name !== myName
  );

  for (const snake of opponents) {
    const enemyBody = snake.body;
    const directions = collide(myHead, enemyBody);

    for (const direction of possibleMoves) {
      if (!directions[direction]) isMoveSafe[direction] = false;
    }
  }

  // Are there any safe moves left?
  const safeMoves = possibleMoves.filter((direction) => isMoveSafe[direction]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  const food: Coord[] = gameState.board.food;
  const closestFood: Coord = food[findClosestFood(myHead, food)];
  const foodDirections: Move = getDirection(myHead, closestFood);
  const moveTowardsFood: MoveKeys[] = possibleMoves.filter(
    (direction) => foodDirections[direction]
  );

  const safeAndFood: MoveKeys[] = getIntersection(safeMoves, moveTowardsFood);

  const nextMove =
    safeAndFood.length > 0
      ? safeAndFood[Math.floor(Math.random() * safeAndFood.length)]
      : safeMoves[Math.floor(Math.random() * safeMoves.length)];

  console.log(`Current Head: ${myHead.x},${myHead.y}`);
  console.log(`MOVE ${gameState.turn}: ${nextMove}`);
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end,
});
