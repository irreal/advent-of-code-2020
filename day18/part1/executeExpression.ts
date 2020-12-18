import { Expression, Operand } from "./models.ts";

export function executeExpression(expr: Expression[]): number {
  let result: number | null = null;
  let operation: Operand | null = null;
  expr.forEach((ex) => {
    if (operation === null) {
      result =
        ex.number !== undefined
          ? ex.number
          : executeExpression(ex.subExpressions!);
    }
    if (operation === "*") {
      result! *=
        ex.number !== undefined
          ? ex.number
          : executeExpression(ex.subExpressions!);
    } else if (operation === "+") {
      result! +=
        ex.number !== undefined
          ? ex.number
          : executeExpression(ex.subExpressions!);
    }
    operation = ex.operand ?? null;
  });
  if (result === null) {
    throw new Error(
      "Invalid expression, no operations to perform and no numbers?"
    );
  }
  return result;
}
