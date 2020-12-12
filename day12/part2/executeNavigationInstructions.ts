import { executeNavigationInstruction } from "./executeNavigationInstruction.ts";
import { NavigationInstruction } from "./parseNavigationInstructionLines.ts";

export type NavigationResult = {
  x: number;
  y: number;
  waypointX: number;
  waypointY: number;
};

export function executeNavigationInstructions(
  instructions: NavigationInstruction[],
  startX = 0,
  startY = 0,
  startWaypointX = 10,
  startWaypointY = -1
): NavigationResult {
  let x = startX;
  let y = startY;
  let waypointX = startWaypointX;
  let waypointY = startWaypointY;
  instructions.forEach((i) => {
    const result = executeNavigationInstruction(i, x, y, waypointX, waypointY);
    x = result.x;
    y = result.y;
    waypointX = result.waypointX;
    waypointY = result.waypointY;
  });
  return {
    x,
    y,
    waypointX,
    waypointY,
  };
}
