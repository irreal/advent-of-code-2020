import { Tile } from "./models.ts";

export function mergeTiles(arrangement: Tile[][]): Tile {
  const sideLength = arrangement[0].length;
  const newData: string[] = [];
  for (let y = 0; y < sideLength; y++) {
    const subLength = arrangement[y][0].data.length;
    for (let subY = 1; subY < subLength - 1; subY++) {
      let newRow = "";
      for (let x = 0; x < sideLength; x++) {
        newRow += arrangement[y][x].data[subY].slice(
          1,
          arrangement[y][x].data[subY].length - 1
        );
      }
      newData.push(newRow);
    }
  }
  return { id: 0, data: newData };
}
