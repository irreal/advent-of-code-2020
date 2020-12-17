import { getKeyForCoord } from "./getKeyForCoord.ts";

export function parseInitialNodes(lines: string[]): Map<symbol, boolean> {
  const nodes = new Map<symbol, boolean>();
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      nodes.set(getKeyForCoord({ x, y, z: 0, w: 0 }), lines[y][x] === "#");
    }
  }
  return nodes;
}
