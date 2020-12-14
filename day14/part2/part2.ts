import { Engine } from "./engine.ts";
import { parseInstructionsFromLines } from "./parseInstructionsFromLines.ts";
const contents = await Deno.readTextFile("../input.txt");
const inputData = contents.split("\n").filter((n) => n !== "");

const instructions = parseInstructionsFromLines(inputData);

const engine = new Engine(instructions);
const result = engine.executeAll();
console.log(
  "sum of all memory values: ",
  Object.values(result.memoryValues).reduce((tot, cur) => (tot += cur), 0)
);
