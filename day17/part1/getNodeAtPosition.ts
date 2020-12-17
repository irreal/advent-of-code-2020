import { Node } from "./models.ts";

export function getNodeAtPosition(
  nodes: Node[],
  x: number,
  y: number,
  z: number
): Node | null {
  return nodes.find((n) => n.x === x && n.y === y && n.z === z) ?? null;
}
