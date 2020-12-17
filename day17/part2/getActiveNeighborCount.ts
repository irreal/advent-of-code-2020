import { Node } from "./models.ts";
import { getStatusAtPosition } from "./getStatusAtPosition.ts";
import { getNeighborNodeCoordinates } from "./getNeighborNodeCoordinates.ts";

export function getActiveNeighborCount(
  nodes: Node[],
  targetNode: Node
): number {
  const coordinates = getNeighborNodeCoordinates(targetNode);
  return coordinates.reduce(
    (tot, cur) =>
      (tot += getStatusAtPosition(nodes, cur.x, cur.y, cur.z, cur.w) ? 1 : 0),
    0
  );
}
