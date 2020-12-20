import { Rule, RuleSet } from "./models.ts";

export function validateRule(
  input: string,
  rules: RuleSet[],
  ruleSet: RuleSet
): boolean {
  const validSequence = computeValidSequence(rules, input, "", ruleSet);
  return validSequence !== null && validSequence.length === input.length;
}

function computeValidSequence(
  ruleSet: RuleSet[],
  input: string,
  formedRule: string,
  rule: RuleSet
): string | null {
  if (!Array.isArray(rule.rule)) {
    formedRule += rule.rule;
    if (input.startsWith(formedRule)) {
      return formedRule;
    } else {
      return null;
    }
  } else {
    const oldFormed = formedRule;
    let failed = false;
    for (let i = 0; i < rule.rule.length; i++) {
      const subRule = rule.rule[i];
      const resolved = computeValidSequence(
        ruleSet,
        input,
        formedRule,
        resolveRule(ruleSet, subRule)
      );
      if (resolved) {
        formedRule = resolved;
      } else {
        failed = true;
        break;
      }
    }

    if (!failed) {
      return formedRule;
    }

    formedRule = oldFormed;

    if (rule.altRule) {
      failed = false;
      for (let i = 0; i < rule.altRule.length; i++) {
        const subRule = rule.altRule[i];
        const resolved = computeValidSequence(
          ruleSet,
          input,
          formedRule,
          resolveRule(ruleSet, subRule as number)
        );
        if (resolved) {
          formedRule = resolved;
        } else {
          failed = true;
          break;
        }
      }
      if (!failed) {
        return formedRule;
      }
    }

    return null;
  }
}

function resolveRule(ruleSet: RuleSet[], ruleNumber: number): RuleSet {
  const rule = ruleSet.find((rs) => rs.number === ruleNumber);
  if (!rule) {
    throw new Error("missing rule " + ruleNumber);
  }
  return rule;
}
