import { Tile } from "./models.ts";

export function flipTile(tile: Tile): Tile {
  const newData: string[] = [];
  for (let i = tile.data.length - 1; i >= 0; i--) {
    newData.push(tile.data[i]);
  }
  return { id: tile.id, data: newData };
}
