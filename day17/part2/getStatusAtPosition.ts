import { getNodeAtPosition } from "./getNodeAtPosition.ts";
import { Node } from "./models.ts";

export function getStatusAtPosition(
  nodes: Node[],
  x: number,
  y: number,
  z: number,
  w: number
): boolean {
  const node = getNodeAtPosition(nodes, x, y, z, w);
  if (!node) {
    return false;
  }
  return node.isActive;
}
