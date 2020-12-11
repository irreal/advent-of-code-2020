import { simulateSeatLayoutStep } from "./simulateSeatLayoutStep.ts";
const contents = await Deno.readTextFile("../input.txt");
const seatLayout = contents.split("\n").filter((n) => n !== "");

let isChanging = true;
let layout = seatLayout;
while (isChanging) {
  const result = simulateSeatLayoutStep(layout);
  layout = result.newLayout;
  if (!result.hasChanged) {
    isChanging = false;
  }
}

console.log("done!");
let finalOccupiedCount = 0;
for (let y = 0; y < layout.length; y++) {
  for (let x = 0; x < layout[y].length; x++) {
    if (layout[y][x] === "#") {
      finalOccupiedCount++;
    }
  }
}

console.log("Final occupied count: ", finalOccupiedCount);
