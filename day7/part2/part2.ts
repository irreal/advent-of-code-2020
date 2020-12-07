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

console.log(
  "shiny gold contains: " +
    bagContents["shiny gold"].getTotalBagsContained(bagContents)
);
