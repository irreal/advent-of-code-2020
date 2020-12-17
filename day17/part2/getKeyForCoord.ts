import { Coordinates } from "./models.ts";

export function getKeyForCoord(coord: Coordinates): symbol {
  return Symbol.for(`coord[${coord.x}:${coord.y}:${coord.z}:${coord.w}]`);
}
