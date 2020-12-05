import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { checkPassportStructureIsValid } from "./checkPassportStructureIsValid.ts";
Deno.test("checkPassportIsValid validates properties", () => {
  assertEquals(checkPassportStructureIsValid({}), false);
  assertEquals(
    checkPassportStructureIsValid({
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
    checkPassportStructureIsValid({
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
    checkPassportStructureIsValid({
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
