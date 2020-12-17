import { Node } from "./models.ts";

export function getNeighborNodeCoordinates(
  node: Node
): { x: number; y: number; z: number }[] {
  const neighbors: { x: number; y: number; z: number }[] = [];
  for (let z = -1; z <= 1; z++) {
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (x === 0 && y == 0 && z === 0) {
          continue;
        }
        neighbors.push({ x: node.x + x, y: node.y + y, z: node.z + z });
      }
    }
  }
  return neighbors;
}
