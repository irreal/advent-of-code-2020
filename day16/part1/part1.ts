import { parseInputLines } from "./parseInputLines.ts";
import { valueValidForRule } from "./valueValidForRule.ts";

const contents = await Deno.readTextFile("../input.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const { rules, ourTicket, nearbyTickets } = parseInputLines(lines);

// find nearbyTicket fields which have values that are invalid for any field

const invalidValues: number[] = [];

nearbyTickets.forEach((ticket) => {
  ticket.values.forEach((value) => {
    const valid = rules.some((rule) => valueValidForRule(value, rule));
    if (!valid) {
      invalidValues.push(value);
    }
  });
});

console.log(`there are: ${invalidValues.length} invalid values!`);
const sum = invalidValues.reduce((sum, cur) => (sum += cur), 0);
console.log("the sum of their values is: ", sum);
