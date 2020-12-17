import { getNodeAtPosition } from "./getNodeAtPosition.ts";
import { Node } from "./models.ts";

export function setStatusAtPosition(
  nodes: Node[],
  x: number,
  y: number,
  z: number,
  w: number,
  isActive: boolean
): Node[] {
  const node = getNodeAtPosition(nodes, x, y, z, w);
  if (!node) {
    return [...nodes, { isActive, x, y, z, w }];
  }
  const newNodes = nodes.filter(
    (n) => !(n.x === x && n.y === y && n.z === z && n.w === w)
  );
  newNodes.push({ isActive, x, y, z, w });
  return newNodes;
}
