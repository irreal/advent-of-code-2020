import { getNodeAtPosition } from "./getNodeAtPosition.ts";
import { Coordinates, Node } from "./models.ts";

export function getStatusAtPosition(
  nodes: Map<Coordinates, boolean>,
  coordinates: Coordinates
): boolean {
  const node = getNodeAtPosition(nodes, coordinates);
  return Boolean(node);
}
