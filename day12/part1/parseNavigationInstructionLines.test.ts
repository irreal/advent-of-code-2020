import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parseNavigationInstructionLines } from "./parseNavigationInstructionLines.ts";
await Deno.test("Parses instruction lines into", () => {
  assertEquals(parseNavigationInstructionLines(["F10", "N3", "R270"]), [
    {
      type: "move",
      direction: "F",
      amount: 10,
    },
    {
      type: "move",
      direction: "N",
      amount: 3,
    },
    {
      type: "rotate",
      direction: "R",
      amount: 270,
    },
  ]);
});
