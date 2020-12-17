import { Coordinates } from "./models.ts";

export function setStatusAtPosition(
  nodes: Map<Coordinates, boolean>,
  coordinates: Coordinates,
  isActive: boolean
) {
  nodes.set(
    { x: coordinates.x, y: coordinates.y, z: coordinates.z, w: coordinates.w },
    isActive
  );
}
