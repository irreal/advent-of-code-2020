import { getActiveNeighborCount } from "./getActiveNeighborCount.ts";
import { setStatusAtPosition } from "./setStatusAtPosition.ts";
import { Node } from "./models.ts";
import { getNeighborNodeCoordinates } from "./getNeighborNodeCoordinates.ts";
import { getNodeAtPosition } from "./getNodeAtPosition.ts";

export function executeCycle(nodes: Node[]): Node[] {
  let newNodes: Node[] = [];
  const nodesToCheck: Node[] = [...nodes];
  nodes.forEach((node) => {
    const coordinates = getNeighborNodeCoordinates(node);
    coordinates.forEach((coord) => {
      const existingNode = getNodeAtPosition(
        nodesToCheck,
        coord.x,
        coord.y,
        coord.z
      );
      if (existingNode === null) {
        nodesToCheck.push({
          isActive: false,
          x: coord.x,
          y: coord.y,
          z: coord.z,
        });
      }
    });
  });

  for (let index = 0; index < nodesToCheck.length; index++) {
    const node = nodesToCheck[index];
    const count = getActiveNeighborCount(nodes, node);
    let newStatus = true;
    if (node.isActive) {
      if (count !== 2 && count !== 3) {
        newStatus = false;
      }
    } else {
      if (count !== 3) {
        newStatus = false;
      }
    }
    newNodes = setStatusAtPosition(newNodes, node.x, node.y, node.z, newStatus);
  }
  return newNodes;
}
