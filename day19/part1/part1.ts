import { parseRulesFromLines } from "./parseRulesFromLines.ts";
import { validateRule } from "./validateRule.ts";

const contents = await Deno.readTextFile("../input.txt");

const lines = contents.replaceAll("\r", "").split("\n");

const rules = parseRulesFromLines(lines.slice(0, lines.indexOf("---")));

const input = lines.slice(lines.indexOf("---") + 1);

const rule0 = rules.find((r) => r.number === 0);
if (!rule0) {
  throw new Error("missing rule 0");
}
validateRule(input[0], rules, rule0);
