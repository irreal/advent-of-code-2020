import { Rule, Ticket } from "./models.ts";
import { valueValidForRule } from "./valueValidForRule.ts";

export function getPossibleRulesPerIndex(
  tickets: Ticket[],
  rules: Rule[]
): { index: number; rules: Rule[] }[] {
  const result: { index: number; rules: Rule[] }[] = [];
  for (let i = 0; i < tickets[0].values.length; i++) {
    const potentialRules = rules.filter((r) =>
      tickets.every((t) => valueValidForRule(t.values[i], r))
    );
    result.push({ index: i, rules: potentialRules });
  }
  return result;
}
