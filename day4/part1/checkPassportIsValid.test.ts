import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { checkPassportIsValid } from "./checkPassportIsValid.ts";
Deno.test("checkPassportIsValid validates properties", () => {
  assertEquals(checkPassportIsValid({}), false);
  assertEquals(
    checkPassportIsValid({
      byr: "mock",
      cid: "mock",
      ecl: "mock",
      eyr: "mock",
      hcl: "mock",
      hgt: "mock",
      iyr: "mock",
      pid: "mock",
    }),
    true
  );

  assertEquals(
    checkPassportIsValid({
      cid: "mock",
      ecl: "mock",
      eyr: "mock",
      hcl: "mock",
      hgt: "mock",
      iyr: "mock",
      pid: "mock",
    }),
    false
  );

  assertEquals(
    checkPassportIsValid({
      byr: "mock",
      ecl: "mock",
      eyr: "mock",
      hcl: "mock",
      hgt: "mock",
      iyr: "mock",
      pid: "mock",
    }),
    true
  );
});
