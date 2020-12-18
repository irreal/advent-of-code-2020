import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parseExpressionsFromLines } from "./parseExpressionsFromLines.ts";
await Deno.test("parse simple expressions", () => {
  const result = parseExpressionsFromLines(["1 + 2"]);
  assertEquals(result, [{ leftHandSide: 1, rightHandSide: 2, operand: "+" }]);

  const result2 = parseExpressionsFromLines(["9 * 0"]);
  assertEquals(result2, [{ leftHandSide: 9, rightHandSide: 0, operand: "*" }]);
});

await Deno.test("parse continuous expressions", () => {
  const result = parseExpressionsFromLines(["1 + 2 + 3"]);
  assertEquals(result, [
    {
      leftHandSide: { leftHandSide: 1, rightHandSide: 2, operand: "+" },
      rightHandSide: 3,
      operand: "+",
    },
  ]);
});

await Deno.test("parse nested expressions", () => {
  const result = parseExpressionsFromLines(["(1 * 3) + 2"]);
  assertEquals(result, [
    {
      leftHandSide: { leftHandSide: 1, rightHandSide: 3, operand: "*" },
      rightHandSide: 2,
      operand: "+",
    },
  ]);

  const result2 = parseExpressionsFromLines(["3 * (3 + 1)"]);
  assertEquals(result2, [
    {
      leftHandSide: 3,
      rightHandSide: { leftHandSide: 3, rightHandSide: 1, operand: "+" },
      operand: "*",
    },
  ]);

  const result3 = parseExpressionsFromLines(["(3 + 2) * (3 + 1)"]);
  assertEquals(result3, [
    {
      leftHandSide: { leftHandSide: 3, rightHandSide: 2, operand: "+" },
      rightHandSide: { leftHandSide: 3, rightHandSide: 1, operand: "+" },
      operand: "*",
    },
  ]);
});

await Deno.test("parse multi level nested expressions", () => {
  const result = parseExpressionsFromLines(["((1 + 1) * 3) + 2"]);
  assertEquals(result, [
    {
      leftHandSide: {
        leftHandSide: { leftHandSide: 1, rightHandSide: 1, operand: "+" },
        rightHandSide: 3,
        operand: "*",
      },
      rightHandSide: 2,
      operand: "+",
    },
  ]);

  const result2 = parseExpressionsFromLines(["(1 * (3 + 0)) + 2"]);
  assertEquals(result2, [
    {
      leftHandSide: {
        leftHandSide: 1,
        rightHandSide: { leftHandSide: 3, rightHandSide: 0, operand: "+" },
        operand: "*",
      },
      rightHandSide: 2,
      operand: "+",
    },
  ]);

  const result3 = parseExpressionsFromLines(["((1 + 1) * (3 + 0)) + 2"]);
  assertEquals(result3, [
    {
      leftHandSide: {
        leftHandSide: { leftHandSide: 1, rightHandSide: 1, operand: "+" },
        rightHandSide: { leftHandSide: 3, rightHandSide: 0, operand: "+" },
        operand: "*",
      },
      rightHandSide: 2,
      operand: "+",
    },
  ]);
});
