import { BagContents } from "./BagContents.ts";

const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n");

const bagContents: { [key: string]: BagContents } = lines
  .filter((l) => l !== "")
  .reduce((obj, cur) => {
    const bagContents = new BagContents(cur);
    obj[bagContents.color] = bagContents;
    return obj;
  }, {} as { [key: string]: BagContents });

const bagsContainingShinyGold = new Set<string>();
const bagsNotContainingShinyGold = new Set<string>();

Object.keys(bagContents).forEach((bc) => {
  findShinyGold(bagContents[bc]);
});
console.log("found bags: " + bagsContainingShinyGold.size);

function findShinyGold(contents: BagContents): boolean {
  if (bagsNotContainingShinyGold.has(contents.color)) {
    return false;
  }

  let found = false;
  for (let i = 0; i < contents.containedBags.length; i++) {
    const cb = contents.containedBags[i];
    if (cb.color === "shiny gold" || bagsContainingShinyGold.has(cb.color)) {
      found = true;
      break;
    }
    if (findShinyGold(bagContents[cb.color])) {
      found = true;
      break;
    }
  }
  if (found) {
    bagsContainingShinyGold.add(contents.color);
  } else {
    bagsNotContainingShinyGold.add(contents.color);
  }
  return found;
}
