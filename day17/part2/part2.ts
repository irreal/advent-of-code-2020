import { parseInitialNodes } from "./parseInitialNodes.ts";
import { executeCycle } from "./executeCycle.ts";
const contents = await Deno.readTextFile("../input.txt");

const lines = contents.split("\n").filter((l) => l !== "");

let nodes = parseInitialNodes(lines);

for (let cycle = 0; cycle < 6; cycle++) {
  nodes = executeCycle(nodes, cycle);
}

console.log("number of active: ", nodes.filter((n) => n.isActive).length);
