import { Tile } from "./models.ts";

export function printTilesTtB(tile1: Tile, tile2: Tile) {
  console.clear();
  console.log("");
  for (let i = 0; i < tile1.data.length; i++) {
    console.log(tile1.data[i] + (i === 0 ? "\t" + tile1.id : ""));
  }
  console.log("");
  for (let i = 0; i < tile2.data.length; i++) {
    console.log(tile2.data[i] + (i === 0 ? "\t" + tile2.id : ""));
  }
}
