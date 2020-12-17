import { Node } from "./models.ts";

export function parseInitialNodes(lines: string[]): Node[] {
  const nodeList: Node[] = [];
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      nodeList.push({ isActive: lines[y][x] === "#", x: x, y: y, z: 0 });
    }
  }
  return nodeList;
}
