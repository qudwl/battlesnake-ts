export function collide(inital: number, target: number): [boolean, boolean] {
  let result: [boolean, boolean] = [true, true];
  if (inital - 1 === target) result[0] = false;
  if (inital + 1 === target) result[1] = false;
  return result;
}
