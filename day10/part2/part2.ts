import { sortJoltAdapters } from "./sortJoltAdapters.ts";
import { countAdapterCombinations } from "./countAdapterCombinations.ts";

const contents = await Deno.readTextFile("../input.txt");
const jolts = contents
  .split("\n")
  .filter((n) => n !== "")
  .map((l) => Number(l));

const sortResult = sortJoltAdapters(jolts);

console.log(countAdapterCombinations(sortResult.sortedJolts));
