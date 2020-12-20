import { Tile } from "./models.ts";

export function getTileById(tiles: Tile[], id: number): Tile {
  const match = tiles.find((t) => t.id === id);
  if (!match) {
    throw new Error("tile with id " + id + " not found!");
  }
  return match;
}
