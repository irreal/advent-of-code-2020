import {
  assert,
  assertEquals,
} from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  simulateSeatLayoutStep,
  SeatLayoutStepResult,
} from "./simulateSeatLayoutStep.ts";
Deno.test("simulateSeatLayoutStep", () => {
  const result = simulateSeatLayoutStep([
    "L.LL.LL.LL",
    "LLLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLLL",
    "L.LLLLLL.L",
    "L.LLLLL.LL",
  ]);

  assertEquals(result.newLayout, [
    "#.##.##.##",
    "#######.##",
    "#.#.#..#..",
    "####.##.##",
    "#.##.##.##",
    "#.#####.##",
    "..#.#.....",
    "##########",
    "#.######.#",
    "#.#####.##",
  ]);
  assertEquals(result.hasChanged, true);

  const result2 = simulateSeatLayoutStep(result.newLayout);

  assertEquals(result2.newLayout, [
    "#.LL.LL.L#",
    "#LLLLLL.LL",
    "L.L.L..L..",
    "LLLL.LL.LL",
    "L.LL.LL.LL",
    "L.LLLLL.LL",
    "..L.L.....",
    "LLLLLLLLL#",
    "#.LLLLLL.L",
    "#.LLLLL.L#",
  ]);
  assertEquals(result2.hasChanged, true);

  const finalResult = simulateSeatLayoutStep([
    "#.L#.L#.L#",
    "#LLLLLL.LL",
    "L.L.L..#..",
    "##L#.#L.L#",
    "L.L#.LL.L#",
    "#.LLLL#.LL",
    "..#.L.....",
    "LLL###LLL#",
    "#.LLLLL#.L",
    "#.L#LL#.L#",
  ]);
  assertEquals(finalResult.newLayout, [
    "#.L#.L#.L#",
    "#LLLLLL.LL",
    "L.L.L..#..",
    "##L#.#L.L#",
    "L.L#.LL.L#",
    "#.LLLL#.LL",
    "..#.L.....",
    "LLL###LLL#",
    "#.LLLLL#.L",
    "#.L#LL#.L#",
  ]);
  assertEquals(finalResult.hasChanged, false);
});
