import { Tile } from "./models.ts";

export function findTileInTile(
  tile: Tile,
  map: Tile
): { x: number; y: number }[] {
  if (
    tile.data.length > map.data.length ||
    tile.data[0].length > map.data[0].length
  ) {
    return [];
  }
  const coords: { x: number; y: number }[] = [];
  for (let y = 0; y <= map.data.length - tile.data.length; y++) {
    for (let x = 0; x <= map.data[y].length - tile.data[0].length; x++) {
      let found = true;

      for (let ty = 0; ty < tile.data.length; ty++) {
        if (!found) {
          break;
        }
        for (let tx = 0; tx < tile.data[ty].length; tx++) {
          if (tile.data[ty][tx] === "#" && map.data[y + ty][x + tx] !== "#") {
            found = false;
            break;
          }
        }
      }
      if (found) {
        coords.push({ x, y });
      }
    }
  }
  return coords;
}
