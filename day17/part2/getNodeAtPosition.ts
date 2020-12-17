import { Node } from "./models.ts";

export function getNodeAtPosition(
  nodes: Node[],
  x: number,
  y: number,
  z: number,
  w: number
): Node | null {
  return (
    nodes.find((n) => n.x === x && n.y === y && n.z === z && n.w === w) ?? null
  );
}
