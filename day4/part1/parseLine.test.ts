import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parseLine } from "./parseLine.ts";
Deno.test("parseLine parses properties", () => {
  assertEquals(parseLine("prop:value"), { prop: "value" });
  assertEquals(parseLine("prop:value prop2:value2 prop3:value3"), {
    prop: "value",
    prop2: "value2",
    prop3: "value3",
  });
});

Deno.test("parseLine throws on malformed input", () => {
  assertThrows(
    () => {
      parseLine("prop");
    },
    undefined,
    "malformed input"
  );

  assertThrows(
    () => {
      parseLine("prop:value prop2");
    },
    undefined,
    "malformed input"
  );

  assertThrows(
    () => {
      parseLine("prop:value  prop2:value2");
    },
    undefined,
    "malformed input"
  );
});
