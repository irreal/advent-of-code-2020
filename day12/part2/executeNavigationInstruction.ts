import { NavigationResult } from "./executeNavigationInstructions.ts";
import {
  MoveInstruction,
  NavigationInstruction,
  RotateInstruction,
} from "./parseNavigationInstructionLines.ts";

export function executeNavigationInstruction(
  instruction: NavigationInstruction,
  x: number,
  y: number,
  waypointX: number,
  waypointY: number
): NavigationResult {
  if (instruction.type === "rotate" || instruction.direction !== "F") {
    const result =
      instruction.type === "rotate"
        ? getWaypointAfterRotation(waypointX, waypointY, instruction)
        : getWaypointAfterMoving(waypointX, waypointY, instruction);
    waypointX = result.x;
    waypointY = result.y;
  } else {
    x += waypointX * instruction.amount;
    y += waypointY * instruction.amount;
  }
  return { x, y, waypointX, waypointY };
}

function getWaypointAfterRotation(
  x: number,
  y: number,
  instruction: RotateInstruction
): { x: number; y: number } {
  let tmp = 0;
  let rotationAmount =
    instruction.direction === "L" ? -instruction.amount : instruction.amount;
  if (rotationAmount < 0) {
    rotationAmount += 360;
  }
  switch (rotationAmount) {
    case 90:
      tmp = y;
      y = x;
      x = -tmp;
      break;
    case 180:
      x = -x;
      y = -y;
      break;
    case 270:
      tmp = x;
      x = y;
      y = -tmp;
  }
  return { x, y };
}
function getWaypointAfterMoving(
  x: number,
  y: number,
  instruction: MoveInstruction
): { x: number; y: number } {
  const direction = getDirectionFromHeading(instruction);
  return {
    x: x + direction.x * instruction.amount,
    y: y + direction.y * instruction.amount,
  };
}

function getDirectionFromHeading(
  instruction: MoveInstruction
): { x: number; y: number } {
  switch (instruction.direction) {
    case "E":
      return { x: 1, y: 0 };
    case "W":
      return { x: -1, y: 0 };
    case "N":
      return { x: 0, y: -1 };
    case "S":
      return { x: 0, y: 1 };
    default:
      throw new Error("invalid direction" + instruction.direction);
  }
}
