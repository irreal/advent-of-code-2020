import { Tile } from "./models.ts";

export function matchRightToLeft(tile1: Tile, tile2: Tile): boolean {
  const sideLength = tile1.data[0].length;
  for (let y = 0; y < tile1.data.length; y++) {
    if (tile1.data[y][sideLength - 1] !== tile2.data[y][0]) {
      return false;
    }
  }
  return true;
}

export function matchLeftToRight(tile1: Tile, tile2: Tile): boolean {
  const sideLength = tile1.data[0].length;
  for (let y = 0; y < tile1.data.length; y++) {
    if (tile1.data[y][0] !== tile2.data[y][sideLength - 1]) {
      return false;
    }
  }
  return true;
}

export function matchBottomToTop(tile1: Tile, tile2: Tile): boolean {
  const sideLength = tile1.data[tile1.data.length - 1].length;
  for (let x = 0; x < sideLength; x++) {
    if (tile1.data[tile1.data.length - 1][x] !== tile2.data[0][x]) {
      return false;
    }
  }
  return true;
}

export function matchTopToBottom(tile1: Tile, tile2: Tile): boolean {
  const sideLength = tile1.data[tile1.data.length - 1].length;
  for (let x = 0; x < sideLength; x++) {
    if (tile1.data[0][x] !== tile2.data[tile2.data.length - 1][x]) {
      return false;
    }
  }
  return true;
}
