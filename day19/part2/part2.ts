import { parseRulesFromLines } from "./parseRulesFromLines.ts";
import { validateRule } from "./validateRule.ts";

// const contents = await Deno.readTextFile("../input.txt");
const contents = await Deno.readTextFile("../simple_example.txt");

const lines = contents.replaceAll("\r", "").split("\n");
// const lines = ["0: 1 2", '1: "a"', "2: 1 3 | 3 1", '3: "b"', "---", "bab"];

const rules = parseRulesFromLines(lines.slice(0, lines.indexOf("---")));

const input = lines.slice(lines.indexOf("---") + 1);

const rule0 = rules.find((r) => r.number === 0);
if (!rule0) {
  throw new Error("missing rule 0");
}
// const result = validateRule("babbbbaabbbbbabbbbbbaabaaabaaa", rules, rule0);
// console.log(result);
let count = 0;
let index = 0;
input.forEach((inp) => {
  const result = validateRule(inp, rules, rule0);
  count += result ? 1 : 0;
  index++;
});
console.log("total count of valid: ", count);
