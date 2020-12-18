import { Expression } from "./models.ts";

export function executeExpression(expr: Expression | number): number {
  if (typeof expr === "number") {
    return expr;
  }
  switch (expr.operand) {
    case "*":
      return (
        executeExpression(expr.leftHandSide) *
        executeExpression(expr.rightHandSide)
      );
    case "+":
      return (
        executeExpression(expr.leftHandSide) +
        executeExpression(expr.rightHandSide)
      );
  }
}
