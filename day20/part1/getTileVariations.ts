import { flipTile } from "./flipTile.ts";
import { Tile } from "./models.ts";
import { rotateTile } from "./rotateTile.ts";

export function getTileVariations(tile: Tile): Tile[] {
  const newTiles: Tile[] = [];
  for (let rotation = 0; rotation < 4; rotation++) {
    newTiles.push(flipTile(rotateTile(tile, rotation)));
    newTiles.push(rotateTile(tile, rotation));
  }
  return newTiles;
}
