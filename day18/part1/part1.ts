import { executeExpression } from "./executeExpression.ts";
import { parseExpressionsFromLines } from "./parseExpressionsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const expressions = parseExpressionsFromLines(["1 + 2 * 3 + 4 * 5 + 6"]);

const results = expressions.map(executeExpression);
console.log(results.reduce((tot, cur) => (tot += cur), 0));
