const contents = await Deno.readTextFile("../input.txt");
const inputData = contents.split("\n").filter((n) => n !== "");

const busTimes = inputData[1].split(",");
// const busTimes = ["7", "13", "x", "x", "59", "x", "31", "19"];

const busIdOffsets = busTimes
  .map((id, offsetIndex) => ({
    id: id === "x" ? BigInt(0) : BigInt(id),
    offsetIndex: BigInt(offsetIndex),
  }))
  .filter((bt) => bt.id !== BigInt(0));

let finalTime = BigInt(1);
let multiplier = BigInt(1);

busIdOffsets.forEach((bus) => {
  while ((bus.offsetIndex + finalTime) % bus.id !== BigInt(0)) {
    finalTime += multiplier;
  }
  multiplier *= BigInt(bus.id);
});

console.log(`final timestamp `, finalTime);
