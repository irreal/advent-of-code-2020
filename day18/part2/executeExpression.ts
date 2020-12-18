import { Expression, Operand } from "./models.ts";

export function executeExpression(expr: Expression[]): number {
  const expressions: Expression[] = [];
  let result: number | null = null;
  let lastOperand: Operand | null = null;
  expr.forEach((ex) => {
    if (result === null && ex.operand === "+") {
      result = ex.number ?? executeExpression(ex.subExpressions!);
      lastOperand = ex.operand ?? null;
    } else if (lastOperand === "+") {
      result =
        (result ?? 0) +
        (ex.number !== undefined
          ? ex.number
          : executeExpression(ex.subExpressions!));
      lastOperand = ex.operand!;
      if (lastOperand !== "+") {
        expressions.push({ number: result, operand: "*" });
        result = null;
      }
    } else {
      if (result !== null) {
        expressions.push({ number: result, operand: "*" });
        result = null;
      }
      expressions.push(ex);
      lastOperand = ex.operand!;
    }
  });
  if (result !== null) {
    expressions.push({ number: result, operand: "*" });
  }
  result = null;
  expressions.forEach((ex) => {
    if (result === null) {
      result = ex.number ?? executeExpression(ex.subExpressions!);
    } else {
      result *= ex.number ?? executeExpression(ex.subExpressions!);
    }
  });
  if (result === null) {
    throw new Error(
      "Invalid expression, no operations to perform and no numbers?"
    );
  }
  return result;
}
