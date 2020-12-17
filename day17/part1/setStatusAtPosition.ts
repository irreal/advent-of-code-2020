import { getNodeAtPosition } from "./getNodeAtPosition.ts";
import { Node } from "./models.ts";

export function setStatusAtPosition(
  nodes: Node[],
  x: number,
  y: number,
  z: number,
  isActive: boolean
): Node[] {
  const node = getNodeAtPosition(nodes, x, y, z);
  if (!node) {
    return [...nodes, { isActive, x, y, z }];
  }
  const newNodes = nodes.filter((n) => !(n.x === x && n.y === y && n.z === z));
  newNodes.push({ isActive, x, y, z });
  return newNodes;
}
