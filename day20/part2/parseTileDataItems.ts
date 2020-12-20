import { Tile } from "./models.ts";

export function parseTileDataItems(tileData: string[]): Tile[] {
  return tileData.map((td) => {
    const lines = td.split("\n");
    const id = Number(lines[0].slice(5, lines[0].length - 1));
    let data = lines.slice(1);
    if (data[data.length - 1] === "") {
      data = data.slice(0, data.length - 1);
    }
    return {
      id,
      data,
    } as Tile;
  });
}
