import { Coord, Move } from "types";

export function collide(myHead: Coord, body: Coord[]): Move {
  const isMoveSafe: Move = {
    up: true,
    down: true,
    left: true,
    right: true,
  };
  const hasOnLeft: boolean =
    body.find((pos) => pos.x === myHead.x - 1 && pos.y === myHead.y) !==
    undefined;
  if (hasOnLeft) {
    isMoveSafe.left = false;
  }

  const hasOnRight: boolean =
    body.find((pos) => pos.x === myHead.x + 1 && pos.y === myHead.y) !==
    undefined;
  if (hasOnRight) {
    isMoveSafe.right = false;
  }

  const hasOnUp: boolean =
    body.find((pos) => pos.x === myHead.x && pos.y === myHead.y + 1) !==
    undefined;
  if (hasOnUp) {
    isMoveSafe.up = false;
  }

  const hasOnDown: boolean =
    body.find((pos) => pos.x === myHead.x && pos.y === myHead.y - 1) !==
    undefined;
  if (hasOnDown) {
    isMoveSafe.down = false;
  }

  return isMoveSafe;
}
