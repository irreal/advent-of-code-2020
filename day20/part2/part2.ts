import { findTileArrangement } from "./findTileArrangement.ts";
import { findTileInTile } from "./findTileInTile.ts";
import { getTileVariations } from "./getTileVariations.ts";
import { mergeTiles } from "./mergeTiles.ts";
import { Tile } from "./models.ts";
import { parseTileDataItems } from "./parseTileDataItems.ts";

const contents = await Deno.readTextFile("../input.txt");
// const contents = await Deno.readTextFile("../example.txt");

const tileDataItems = contents.replaceAll("\r", "").split("\n\n");

const tiles = parseTileDataItems(tileDataItems);

const arrangement = findTileArrangement(tiles, Math.sqrt(tiles.length), []);
if (arrangement === null) {
  console.log("Could not find solution with given inputs!");
  Deno.exit();
}

const map = mergeTiles(arrangement);

const monster: Tile = {
  id: 0,
  data: [
    "..................#.",
    "#....##....##....###",
    ".#..#..#..#..#..#...",
  ],
};

let mapPoundCount = 0;
for (let y = 0; y < map.data.length; y++) {
  for (let x = 0; x < map.data[y].length; x++) {
    if (map.data[y][x] === "#") {
      mapPoundCount++;
    }
  }
}
const variations = getTileVariations(monster);
variations.forEach((monsterVar) => {
  const coords = findTileInTile(monsterVar, map);
  console.log(`found : ${coords.length} occurances`);
  console.log("roughness: ", mapPoundCount - coords.length * 15);
});
