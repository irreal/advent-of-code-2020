import { matchLeftToRight, matchTopToBottom } from "./matchTiles.ts";
import { Tile } from "./models.ts";
import { getTileById } from "./getTileById.ts";
import { getTileVariations } from "./getTileVariations.ts";

export function findTileArrangement(
  tiles: Tile[],
  sideLength: number,
  arrangement: Tile[][]
): Tile[][] | null {
  let x = 0,
    y = 0;
  if (arrangement.length > 0) {
    x = arrangement[arrangement.length - 1].length;
    y = arrangement.length - 1;
    if (x === sideLength) {
      x = 0;
      y++;
    }
  }
  if (x === 0 && y === sideLength) {
    return arrangement;
  }

  for (let index = 0; index < tiles.length; index++) {
    const variations = getTileVariations(tiles[index]);
    for (
      let variationIndex = 0;
      variationIndex < variations.length;
      variationIndex++
    ) {
      const tile = variations[variationIndex];
      if (y > 0) {
        if (!matchTopToBottom(tile, arrangement[y - 1][x])) {
          continue;
        }
      }
      if (x > 0) {
        if (!matchLeftToRight(tile, arrangement[y][x - 1])) {
          continue;
        }
      }
      const newTiles = tiles.filter((t) => t.id !== tile.id);
      const newArrangement = copyArrangement(arrangement);
      if (newArrangement.length === y) {
        newArrangement.push([]);
      }
      newArrangement[y].push(tile);
      const tryArrangement = findTileArrangement(
        newTiles,
        sideLength,
        newArrangement
      );
      if (tryArrangement !== null) {
        return tryArrangement;
      }
    }
  }
  return null;
}

function copyArrangement(arrangement: Tile[][]): Tile[][] {
  const newArrangement: Tile[][] = [];
  for (let y = 0; y < arrangement.length; y++) {
    newArrangement.push([]);
    for (let x = 0; x < arrangement[y].length; x++) {
      newArrangement[newArrangement.length - 1].push(arrangement[y][x]);
    }
  }
  return newArrangement;
}
