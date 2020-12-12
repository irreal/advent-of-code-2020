import { executeNavigationInstruction } from "./executeNavigationInstruction.ts";
import { NavigationInstruction } from "./parseNavigationInstructionLines.ts";

export type NavigationResult = {
  x: number;
  y: number;
  rotation: number;
};

export function executeNavigationInstructions(
  instructions: NavigationInstruction[],
  startX = 0,
  startY = 0,
  startRotation = 0
): NavigationResult {
  let x = startX;
  let y = startY;
  let rotation = startRotation;
  instructions.forEach((i) => {
    const result = executeNavigationInstruction(i, x, y, rotation);
    x = result.x;
    y = result.y;
    rotation = result.rotation;
  });
  return {
    x,
    y,
    rotation,
  };
}
