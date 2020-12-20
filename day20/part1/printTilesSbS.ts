import { Tile } from "./models.ts";

export function printTilesSbS(tile1: Tile, tile2: Tile) {
  console.clear();
  console.log(`${tile1.id}\t\t${tile2.id}`);
  console.log("");
  for (let i = 0; i < tile1.data.length; i++) {
    console.log(`${tile1.data[i]}\t${tile2.data[i]}`);
  }
}
