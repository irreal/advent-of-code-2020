import { RuleSet } from "./models.ts";

let triedRulesAtInput: {
  ruleNumber: number;
  sub: 1 | 2;
  input: string;
}[] = [];
export function validateRule(
  input: string,
  rules: RuleSet[],
  ruleSet: RuleSet
): boolean {
  triedRulesAtInput = [];
  const validSequence = computeValidSequence(rules, input, "", ruleSet);
  return validSequence === input;
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
    if (alreadyTried(rule.number, 1, formedRule)) {
      failed = true;
    } else {
      addTriedRule(rule.number, 1, formedRule);
      for (let i = 0; i < rule.rule.length; i++) {
        const subRule = rule.rule[i];
        const resolved = computeValidSequence(
          ruleSet,
          input,
          formedRule,
          resolveRule(ruleSet, subRule)
        );
        if (resolved && input.slice(0, formedRule.length + 1) === resolved) {
          formedRule = resolved;
          if (formedRule === input) {
            break;
          }
        } else {
          failed = true;
          break;
        }
      }
    }

    if (!failed) {
      return formedRule;
    }

    formedRule = oldFormed;

    if (rule.altRule && !alreadyTried(rule.number, 2, formedRule)) {
      addTriedRule(rule.number, 2, formedRule);
      failed = false;
      for (let i = 0; i < rule.altRule.length; i++) {
        const subRule = rule.altRule[i];
        const resolved = computeValidSequence(
          ruleSet,
          input,
          formedRule,
          resolveRule(ruleSet, subRule as number)
        );
        if (resolved && input.slice(0, formedRule.length + 1) === resolved) {
          formedRule = resolved;
          if (formedRule === input) {
            break;
          }
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

function addTriedRule(ruleNumber: number, sub: 1 | 2, input: string) {
  if (!alreadyTried(ruleNumber, sub, input)) {
    triedRulesAtInput.push({ input, sub, ruleNumber });
  }
}

function alreadyTried(ruleNumber: number, sub: 1 | 2, input: string) {
  return (
    triedRulesAtInput.find(
      (r) => r.input === input && r.ruleNumber === ruleNumber && r.sub === sub
    ) !== undefined
  );
}

function resolveRule(ruleSet: RuleSet[], ruleNumber: number): RuleSet {
  const rule = ruleSet.find((rs) => rs.number === ruleNumber);
  if (!rule) {
    throw new Error("missing rule " + ruleNumber);
  }
  return rule;
}
