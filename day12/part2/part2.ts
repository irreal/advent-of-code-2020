import { executeNavigationInstructions } from "./executeNavigationInstructions.ts";
import { parseNavigationInstructionLines } from "./parseNavigationInstructionLines.ts";
const contents = await Deno.readTextFile("../input.txt");
const navigationInstructionLines = contents.split("\n").filter((n) => n !== "");

const navigationInstructions = parseNavigationInstructionLines(
  navigationInstructionLines
);

const finalCoordinates = executeNavigationInstructions(navigationInstructions);

console.log("final position: ", finalCoordinates);
console.log(
  "manhattan distance: ",
  Math.abs(finalCoordinates.x) + Math.abs(finalCoordinates.y)
);
