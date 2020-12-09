import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import {
  ContiguousSetResult,
  findContiguousSetForTargetNumber,
} from "./findContigousSetForTargetNumber.ts";

Deno.test(
  "findContiguousSetForTargetNumber returns found false if set not found",
  () => {
    const testNumbers = [1, 2, 3];
    assertEquals(findContiguousSetForTargetNumber(testNumbers, 4), {
      resultFound: false,
    } as ContiguousSetResult);
  }
);

Deno.test(
  "findContiguousSetForTargetNumber returns start and end index of set",
  () => {
    const testNumbers = [1, 2, 3, 4, 5];
    assertEquals(findContiguousSetForTargetNumber(testNumbers, 7), {
      resultFound: true,
      startIndex: 2,
      endIndex: 3,
    } as ContiguousSetResult);
  }
);

Deno.test("findContiguousSetForTargetNumber when set is at start", () => {
  const testNumbers = [1, 2, 3, 4, 5];
  assertEquals(findContiguousSetForTargetNumber(testNumbers, 3), {
    resultFound: true,
    startIndex: 0,
    endIndex: 1,
  } as ContiguousSetResult);
});

Deno.test("findContiguousSetForTargetNumber when set is at end", () => {
  const testNumbers = [1, 2, 3, 4, 5];
  assertEquals(findContiguousSetForTargetNumber(testNumbers, 12), {
    resultFound: true,
    startIndex: 2,
    endIndex: 4,
  } as ContiguousSetResult);
});

Deno.test("findContiguousSetForTargetNumber when set is entire array", () => {
  const testNumbers = [1, 2, 3, 4, 5];
  assertEquals(findContiguousSetForTargetNumber(testNumbers, 15), {
    resultFound: true,
    startIndex: 0,
    endIndex: 4,
  } as ContiguousSetResult);
});

Deno.test(
  "findContiguousSetForTargetNumber does not find if start number is target",
  () => {
    const testNumbers = [1, 2, 3, 4, 5];
    assertEquals(findContiguousSetForTargetNumber(testNumbers, 1), {
      resultFound: false,
    } as ContiguousSetResult);
  }
);

Deno.test(
  "findContiguousSetForTargetNumber does not find if end number is target",
  () => {
    const testNumbers = [1, 2, 3, 4, 50];
    assertEquals(findContiguousSetForTargetNumber(testNumbers, 50), {
      resultFound: false,
    } as ContiguousSetResult);
  }
);

Deno.test(
  "findContiguousSetForTargetNumber does not find if middle number is target",
  () => {
    const testNumbers = [1, 2, 30, 4, 5];
    assertEquals(findContiguousSetForTargetNumber(testNumbers, 30), {
      resultFound: false,
    } as ContiguousSetResult);
  }
);
