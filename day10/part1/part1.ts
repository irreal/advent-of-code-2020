import { sortJoltAdapters } from "./sortJoltAdapters.ts";

const contents = await Deno.readTextFile("../input.txt");
const jolts = contents
  .split("\n")
  .filter((n) => n !== "")
  .map((l) => Number(l));

const result = sortJoltAdapters(jolts);
console.log(result);

console.log(
  "1 diff multiplied by 3 diff: ",
  result.joltDifferences["1"] * result.joltDifferences["3"]
);
