import { Tile } from "./models.ts";

export function rotateTile(tile: Tile, times = 1): Tile {
  for (let i = 0; i < times; i++) {
    tile = rotateTileRight(tile);
  }
  return tile;
}

function rotateTileRight(tile: Tile): Tile {
  const newData: string[] = [];
  for (let x = 0; x < tile.data[0].length; x++) {
    let row = "";
    for (let y = tile.data.length - 1; y >= 0; y--) {
      row += tile.data[y][x];
    }
    newData.push(row);
  }
  return { id: tile.id, data: newData };
}
