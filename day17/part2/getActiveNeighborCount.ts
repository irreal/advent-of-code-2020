import { Coordinates, Node } from "./models.ts";
import { getStatusAtPosition } from "./getStatusAtPosition.ts";
import { getNeighborNodeCoordinates } from "./getNeighborNodeCoordinates.ts";

export function getActiveNeighborCount(
  nodes: Map<Coordinates, boolean>,
  targetNode: Coordinates
): number {
  const coordinates = getNeighborNodeCoordinates(targetNode);
  return coordinates.reduce(
    (tot, cur) => (tot += getStatusAtPosition(nodes, cur) ? 1 : 0),
    0
  );
}
