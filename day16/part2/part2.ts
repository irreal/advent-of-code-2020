import { parseInputLines } from "./parseInputLines.ts";
import { valueValidForRule } from "./valueValidForRule.ts";
import { getPossibleRulesPerIndex } from "./getPossibleRulesPerIndex.ts";
import { findRuleCombination } from "./findRuleCombination.ts";

const contents = await Deno.readTextFile("../input.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const { rules, ourTicket, nearbyTickets } = parseInputLines(lines);

// find nearbyTicket fields which have values that are invalid for any field

const validTickets = nearbyTickets.filter((ticket) => {
  let valid = true;
  ticket.values.forEach((value) => {
    if (!valid) {
      return;
    }
    const valueValid = rules.some((rule) => valueValidForRule(value, rule));
    if (!valueValid) {
      valid = false;
    }
  });
  return valid;
});

console.log(
  `there are: ${validTickets.length} valid tickets out of ${nearbyTickets.length} total!`
);

const possibleRulesPerIndex = getPossibleRulesPerIndex(validTickets, rules);

const ruleCombination = findRuleCombination(possibleRulesPerIndex);

if (!ruleCombination) {
  throw new Error("did not find target rule combination");
}
const targetRules = ruleCombination.filter((rc) =>
  rc.rule.name.startsWith("departure")
);

let result = ourTicket.values[targetRules[0].index];
for (let i = 1; i < targetRules.length; i++) {
  result *= ourTicket.values[targetRules[i].index];
}
console.log("Final result: ", result);
