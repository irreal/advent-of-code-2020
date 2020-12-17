import { getActiveNeighborCount } from "./getActiveNeighborCount.ts";
import { setStatusAtPosition } from "./setStatusAtPosition.ts";
import { Node } from "./models.ts";
import { getNeighborNodeCoordinates } from "./getNeighborNodeCoordinates.ts";
import { getNodeAtPosition } from "./getNodeAtPosition.ts";

export function executeCycle(nodes: Node[], cycle: number): Node[] {
  let newNodes: Node[] = [];
  const nodesToCheck: Node[] = [...nodes];
  let count = 0;
  nodes.forEach((node) => {
    count++;
    if (count % 1000 === 0) {
      console.clear();
      console.log(
        `Computing nodes to check ${count + 1} / ${nodes.length} in cycle: ${
          cycle + 1
        } / 6`
      );
    }
    const coordinates = getNeighborNodeCoordinates(node);
    coordinates.forEach((coord) => {
      const existingNode = getNodeAtPosition(
        nodesToCheck,
        coord.x,
        coord.y,
        coord.z,
        coord.w
      );
      if (existingNode === null) {
        nodesToCheck.push({
          isActive: false,
          x: coord.x,
          y: coord.y,
          z: coord.z,
          w: coord.w,
        });
      }
    });
  });

  for (let index = 0; index < nodesToCheck.length; index++) {
    if (index % 1000 === 0) {
      console.clear();
      console.log(
        `Checking node ${index + 1} out of ${nodesToCheck.length} in Cycle: ${
          cycle + 1
        } / 6`
      );
    }
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
    newNodes = setStatusAtPosition(
      newNodes,
      node.x,
      node.y,
      node.z,
      node.w,
      newStatus
    );
  }
  return newNodes;
}
