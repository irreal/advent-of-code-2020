import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { checkPassportPropsAreValid } from "./checkPassportPropsAreValid.ts";
Deno.test("checkPassportPropsAreValid validates length props", () => {
  assertEquals(checkPassportPropsAreValid({}, {}), true);
  assertEquals(checkPassportPropsAreValid({}, { mockProp: {} }), false);
  assertEquals(checkPassportPropsAreValid({ byr: "mock" }, { byr: {} }), true);

  //length
  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { minLength: 1 } }),
    true
  );
  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { minLength: 4 } }),
    true
  );
  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { minLength: 5 } }),
    false
  );

  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { maxLength: 1 } }),
    false
  );

  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { maxLength: 4 } }),
    true
  );

  assertEquals(
    checkPassportPropsAreValid({ byr: "mock" }, { byr: { maxLength: 5 } }),
    true
  );

  //prefix and suffix are cut off
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "prefix-mock-suffix" },
      {
        byr: {
          minLength: 4,
          maxLength: 4,
          allowedPrefixes: ["prefix-"],
          allowedSuffixes: ["-suffix"],
        },
      }
    ),
    true
  );

  // is number

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "2020" },
      {
        byr: {
          parsesToNumber: {},
        },
      }
    ),
    true
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "not2020" },
      {
        byr: {
          parsesToNumber: {},
        },
      }
    ),
    false
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "2020not" },
      {
        byr: {
          parsesToNumber: {},
        },
      }
    ),
    false
  );

  // is number in range

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "0" },
      {
        byr: {
          parsesToNumber: { min: 1, max: 10 },
        },
      }
    ),
    false
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "1" },
      {
        byr: {
          parsesToNumber: { min: 1, max: 10 },
        },
      }
    ),
    true
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "10" },
      {
        byr: {
          parsesToNumber: { min: 1, max: 10 },
        },
      }
    ),
    true
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "11" },
      {
        byr: {
          parsesToNumber: { min: 1, max: 10 },
        },
      }
    ),
    false
  );

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "11suf" },
      {
        byr: {
          allowedSuffixes: ["suf"],
          parsesToNumber: { minssuf: 1, maxssuf: 10 },
        },
      }
    ),
    false
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "10suf" },
      {
        byr: {
          allowedSuffixes: ["suf"],
          parsesToNumber: { minssuf: 1, maxssuf: 10 },
        },
      }
    ),
    true
  );
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "0suf" },
      {
        byr: {
          allowedSuffixes: ["suf"],
          parsesToNumber: { minssuf: 1, maxssuf: 10 },
        },
      }
    ),
    false
  );

  //one of

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "test" },
      {
        byr: {
          oneOf: ["test", "anothertest"],
        },
      }
    ),
    true
  );

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "anothertest" },
      {
        byr: {
          oneOf: ["test", "anothertest"],
        },
      }
    ),
    true
  );

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "invalid-test" },
      {
        byr: {
          oneOf: ["test", "anothertest"],
        },
      }
    ),
    false
  );

  //allowed chars
  assertEquals(
    checkPassportPropsAreValid(
      { byr: "123abc123a3bc-" },
      {
        byr: {
          allowedChars: ["1", "2", "3", "a", "b", "c", "-"],
        },
      }
    ),
    true
  );

  assertEquals(
    checkPassportPropsAreValid(
      { byr: "123abc123a3bc-" },
      {
        byr: {
          allowedChars: ["1", "2", "3", "a", "b", "c"],
        },
      }
    ),
    false
  );
});
