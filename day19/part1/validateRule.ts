import { Rule, RuleSet } from "./models.ts";

export function validateRule(
  input: string,
  rules: RuleSet[],
  ruleSet: RuleSet
): boolean {
  const validSequence = computeValidSequence(rules, input, "", ruleSet);
  return validSequence.length > 0;
}

function computeValidSequence(
  ruleSet: RuleSet[],
  input: string,
  formedRule: string,
  rule: RuleSet
): string {}

function ruleToString(rule: Rule): string {
  if (Array.isArray(rule)) {
    return rule.reduce((str, cur) => (str += cur.toString()), "");
  }
  return rule;
}

function ruleSetToStrings(ruleSet: RuleSet): string[] {
  const ruleStrings = [ruleToString(ruleSet.rule)];
  if (ruleSet.altRule) {
    ruleStrings.push(ruleToString(ruleSet.altRule));
  }
  return ruleStrings;
}
