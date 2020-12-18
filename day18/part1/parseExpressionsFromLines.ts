import { findClosingBraceIndex } from "./findCLosingBraceIndex.ts";
import { Expression } from "./models.ts";
export function parseExpressionsFromLines(
  lines: string[]
): (Expression | number)[] {
  return lines.map((l) => parseLine(l));
}

function parseLine(line: string): Expression | number {
  let newLine: string = line;
  if (
    newLine[0] === "(" &&
    findClosingBraceIndex(newLine) === newLine.length - 1
  ) {
    newLine = newLine.slice(1, newLine.length - 1);
  }
  if (line.length === 1) {
    return Number(line);
  }
  const result = parseSingleExpression(newLine);
  if (result.endIndex < newLine.length - 1) {
    newLine = newLine.slice(result.endIndex + 2);
    const operand = newLine[0] as "+" | "*";
    if (operand !== "*" && operand !== "+") {
      throw new Error("invalid operand, " + operand);
    }
    return {
      leftHandSide: result.expr,
      operand,
      rightHandSide: parseLine(newLine.slice(2)),
    };
  }
  return result.expr;
}

function parseSingleExpression(
  input: string
): { expr: Expression; endIndex: number } {
  let leftHandSide: number | Expression = 0;
  let rightHandSide: number | Expression = 0;
  let operandIndex = 2;
  let endIndex = 0;
  const firstChar = input[0];
  throwIfInvalidStart(firstChar);
  if (firstChar === "(") {
    const closingBraceIndex = findClosingBraceIndex(input);
    leftHandSide = parseLine(input.slice(1, closingBraceIndex));
    operandIndex = closingBraceIndex + 2;
  } else {
    leftHandSide = Number(firstChar);
  }
  const operand = input[operandIndex] as "*" | "+";
  if (operand !== "*" && operand !== "+") {
    throw new Error("invalid operand found, " + operand);
  }
  const secondChar = input[operandIndex + 2];
  endIndex = operandIndex + 2;
  throwIfInvalidStart(secondChar);
  if (secondChar === "(") {
    const secondInput = input.slice(operandIndex + 2);
    const closingBraceIndex = findClosingBraceIndex(secondInput);
    rightHandSide = parseLine(secondInput.slice(1, closingBraceIndex));
    endIndex += closingBraceIndex;
  } else {
    rightHandSide = Number(secondChar);
  }
  return {
    expr: {
      leftHandSide,
      rightHandSide,
      operand,
    },
    endIndex,
  };
}

function throwIfInvalidStart(start: string) {
  if (start === ")") {
    throw new Error("malformed input, closing brace without opening brace");
  }
  if (start === " ") {
    throw new Error("malformed input, unexpected space at start");
  }
  if (start === "+" || start === "*") {
    throw new Error("malformed input, operation without lefthand operand");
  }
}
