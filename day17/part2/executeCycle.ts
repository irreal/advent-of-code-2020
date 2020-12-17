import { getActiveNeighborCount } from "./getActiveNeighborCount.ts";
import { setStatusAtPosition } from "./setStatusAtPosition.ts";
import { Coordinates } from "./models.ts";
import { getNeighborNodeCoordinates } from "./getNeighborNodeCoordinates.ts";
import { getNodeAtPosition } from "./getNodeAtPosition.ts";
import { getStatusAtPosition } from "./getStatusAtPosition.ts";

export function executeCycle(nodes: Map<Coordinates, boolean>, cycle: number) {
  const nodesToCheck = new Set<Coordinates>();
  let count = 0;
  nodes.forEach((status, coordinate) => {
    count++;
    if (count % 1000 === 0) {
      console.clear();
      console.log(
        `Computing nodes to check ${count + 1} / ${nodes.size} in cycle: ${
          cycle + 1
        }`
      );
    }
    const coordinates = getNeighborNodeCoordinates(coordinate);
    coordinates.forEach((coord) => {
      const existingNode = getNodeAtPosition(nodes, coord);
      if (existingNode === null) {
        // console.log("existing JE NULL");
        // nodesToCheck.add(coord);
      } else {
        console.log("existing NIJEEEEEEEEEEEE");
      }
    });
  });

  let index = 0;
  for (const coords of nodesToCheck) {
    index++;
    if (index % 1000 === 0) {
      console.clear();
      console.log(
        `Checking node ${index} out of ${nodesToCheck.size} in Cycle: ${
          cycle + 1
        }`
      );
    }
    const node = getStatusAtPosition(nodes, coords);
    const count = getActiveNeighborCount(nodes, coords);
    let newStatus = true;
    if (node) {
      if (count !== 2 && count !== 3) {
        newStatus = false;
      }
    } else {
      if (count !== 3) {
        newStatus = false;
      }
    }
    setStatusAtPosition(nodes, coords, newStatus);
  }
}
