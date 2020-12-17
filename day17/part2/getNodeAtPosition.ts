import { Coordinates } from "./models.ts";

export function getNodeAtPosition(
  nodes: Map<Coordinates, boolean>,
  coordinates: Coordinates
): boolean | null {
  return nodes.get(coordinates) ?? null;
}
