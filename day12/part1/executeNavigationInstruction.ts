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
  rotation: number
): NavigationResult {
  if (instruction.type === "rotate") {
    rotation += instruction.amount * (instruction.direction === "L" ? -1 : 1);
    if (rotation < 0) {
      rotation += 360;
    }
    rotation = rotation % 360;
    return { x, y, rotation };
  }

  const direction = getDirectionFromMoveInstruction(instruction, rotation);

  x += instruction.amount * direction.x;
  y += instruction.amount * direction.y;

  return { x, y, rotation };
}

function getDirectionFromMoveInstruction(
  instruction: MoveInstruction,
  rotation: number
): { x: number; y: number } {
  if (instruction.direction !== "F") {
    return getDirectionFromHeading(instruction);
  }
  return getDirectionFromRotation(rotation);
}

function getDirectionFromRotation(rotation: number): { x: number; y: number } {
  switch (rotation) {
    case 0:
      return { x: 1, y: 0 };
    case 90:
      return { x: 0, y: 1 };
    case 180:
      return { x: -1, y: 0 };
    case 270:
      return { x: 0, y: -1 };
    default:
      throw new Error("Invalid rotation amunt " + rotation);
  }
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
