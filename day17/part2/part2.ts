import { parseInitialNodes } from "./parseInitialNodes.ts";
import { executeCycle } from "./executeCycle.ts";
const contents = await Deno.readTextFile("../example.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const nodes = parseInitialNodes(lines);

for (let cycle = 0; cycle < 6; cycle++) {
  executeCycle(nodes, cycle);
}

let count = 0;
for (const v of nodes.values()) {
  if (v) {
    count++;
  }
}
console.log("number of active: ", count);
