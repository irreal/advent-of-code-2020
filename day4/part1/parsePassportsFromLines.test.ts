import { assertEquals } from "https://deno.land/std@0.79.0/testing/asserts.ts";
import { parsePassportsFromLines } from "./parsePassportsFromLines.ts";
Deno.test("parsePassports from lines parses passports", () => {
  assertEquals(parsePassportsFromLines(["cid:some-country"]), [
    { cid: "some-country" },
  ]);

  assertEquals(
    parsePassportsFromLines(["cid:some-country ecl:black", "eyr:2020"]),
    [{ cid: "some-country", ecl: "black", eyr: "2020" }]
  );

  assertEquals(
    parsePassportsFromLines(["cid:some-country ecl:black", "", "eyr:2020"]),
    [{ cid: "some-country", ecl: "black" }, { eyr: "2020" }]
  );

  assertEquals(
    parsePassportsFromLines(["cid:some-country ecl:black", "", "", "eyr:2020"]),
    [{ cid: "some-country", ecl: "black" }, { eyr: "2020" }]
  );
});

Deno.test("returns empty array when no passports procided", () => {
  assertEquals(parsePassportsFromLines([]), []);
});
