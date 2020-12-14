import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parseInstructionsFromLines } from "./parseInstructionsFromLines.ts";
await Deno.test("parseInstructionsFromLines", () => {
  assertEquals(parseInstructionsFromLines([]), []);

  assertEquals(
    parseInstructionsFromLines([
      "mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
      "mem[8] = 11",
      "mem[7] = 101",
      "mem[8] = 0",
    ]),
    [
      {
        type: "mask",
        maskValues: [
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "X",
          "1",
          "X",
          "X",
          "X",
          "X",
          "0",
          "X",
        ],
      },
      {
        type: "set",
        address: 8,
        value: 11,
      },
      {
        type: "set",
        address: 7,
        value: 101,
      },
      {
        type: "set",
        address: 8,
        value: 0,
      },
    ]
  );
});
