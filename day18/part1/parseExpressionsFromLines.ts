import { findClosingBraceIndex } from "./findCLosingBraceIndex.ts";
import { Expression, Operand } from "./models.ts";
export function parseExpressionsFromLines(lines: string[]): Expression[][] {
  return lines.map((l) => parseLine(l));
}

function parseLine(line: string): Expression[] {
  const expressions: Expression[] = [];
  for (let i = 0; i < line.length; i++) {
    if (line[i] === ")") {
      throw new Error("Invalid input, closing brace without opening brace");
    } else if (line[i] === " ") {
      throw new Error("unexpected space in input string");
    } else if (line[i] === "(") {
      let subLine = line.slice(i);
      const closingBraceIndex = findClosingBraceIndex(subLine);
      subLine = subLine.slice(1, closingBraceIndex);
      i += closingBraceIndex + 2;
      if (i < line.length) {
        expressions.push({
          subExpressions: parseLine(subLine),
          operand: line[i] as Operand,
        });
      } else {
        expressions.push({ subExpressions: parseLine(subLine) });
      }
      i += 1;
    } else {
      const number = Number(line[i]);
      i += 2;
      if (i < line.length) {
        expressions.push({ number, operand: line[i] as Operand });
      } else {
        expressions.push({ number });
      }
      i += 1;
    }
  }
  return expressions;
}
