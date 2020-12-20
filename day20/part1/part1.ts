import { findTileArrangement } from "./findTileArrangement.ts";
import { parseTileDataItems } from "./parseTileDataItems.ts";

// const contents = await Deno.readTextFile("../input.txt");
const contents = await Deno.readTextFile("../input.txt");

const tileDataItems = contents.replaceAll("\r", "").split("\n\n");

const tiles = parseTileDataItems(tileDataItems);

const arrangement = findTileArrangement(tiles, Math.sqrt(tiles.length), []);
if (arrangement === null) {
  console.log("Could not find solution with given inputs!");
  Deno.exit();
}

arrangement.forEach((line) => {
  console.log(line.map((t) => t.id).join("\t"));
  console.log("");
});

const lastIndex = Math.sqrt(tiles.length) - 1;

console.log(
  "Final result: ",
  arrangement[0][0].id *
    arrangement[0][lastIndex].id *
    arrangement[lastIndex][0].id *
    arrangement[lastIndex][lastIndex].id
);
