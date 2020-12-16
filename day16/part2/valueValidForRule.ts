import { Rule } from "./models.ts";

export function valueValidForRule(value: number, rule: Rule): boolean {
  let valid = false;
  for (let i = 0; i < rule.ranges.length; i++) {
    if (value >= rule.ranges[i].min && value <= rule.ranges[i].max) {
      valid = true;
      break;
    }
  }
  return valid;
}
