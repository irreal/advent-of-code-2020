import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { Engine } from "./engine.ts";
await Deno.test("engine", () => {
  const engine = new Engine([
    {
      type: "set",
      address: 1,
      value: 255,
    },
  ]);
  const memory = engine.executeAll();
  assertEquals(memory.memoryValues, { [1]: 255 });
});
