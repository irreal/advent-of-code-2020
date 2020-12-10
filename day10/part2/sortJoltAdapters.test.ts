import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  SortJoltAdaptersResult,
  sortJoltAdapters,
} from "./sortJoltAdapters.ts";

Deno.test("sortJoltAdapters sorts the jolts", () => {
  assertEquals(sortJoltAdapters([1, 2, 3]), {
    isValid: true,
    deviceVoltage: 6,
    joltDifferences: { "1": 3, "2": 0, "3": 1 },
  } as SortJoltAdaptersResult);

  assertEquals(sortJoltAdapters([16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4]), {
    isValid: true,
    deviceVoltage: 22,
    joltDifferences: { "1": 7, "2": 0, "3": 5 },
  } as SortJoltAdaptersResult);

  assertEquals(
    sortJoltAdapters([
      28,
      33,
      18,
      42,
      31,
      14,
      46,
      20,
      48,
      47,
      24,
      23,
      49,
      45,
      19,
      38,
      39,
      11,
      1,
      32,
      25,
      35,
      8,
      17,
      7,
      9,
      4,
      2,
      34,
      10,
      3,
    ]),
    {
      isValid: true,
      deviceVoltage: 52,
      joltDifferences: { "1": 22, "2": 0, "3": 10 },
    } as SortJoltAdaptersResult
  );
});
