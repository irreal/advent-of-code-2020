import { executeExpression } from "./executeExpression.ts";
import { parseExpressionsFromLines } from "./parseExpressionsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const expressions = parseExpressionsFromLines(lines);

const results = expressions.map(executeExpression);
console.log(results.reduce((tot, cur) => (tot += cur), 0));
