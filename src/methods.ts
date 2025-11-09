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

export function findClosestFood(myHead: Coord, foods: Coord[]): number {
  let closestDistance = Infinity;
  let result = 0;

  for (let i = 0; i < foods.length; i++) {
    const food = foods[i];
    const distance =
      Math.pow(myHead.x - food.x, 2) + Math.pow(myHead.y - food.y, 2);
    if (distance < closestDistance) {
      closestDistance = distance;
      result = i;
    }
  }

  return result;
}

export function getDirection(myHead: Coord, food: Coord): Move {
  const result: Move = {
    up: false,
    down: false,
    left: false,
    right: false,
  };

  if (myHead.x < food.x) {
    result.right = true;
  } else if (myHead.x > food.x) {
    result.left = true;
  }

  if (myHead.y < food.y) {
    result.up = true;
  } else if (myHead.y > food.y) {
    result.down = true;
  }

  return result;
}

export function getIntersection<T>(arr1: T[], arr2: T[]): T[] {
  // 1. Create a Set from the second array for fast lookups
  const set2 = new Set(arr2);

  // 2. Filter the first array, keeping only items that exist in the Set
  return arr1.filter((item) => set2.has(item));
}
