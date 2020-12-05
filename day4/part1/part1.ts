import { checkPassportIsValid } from "./checkPassportIsValid.ts";
import { parsePassportsFromLines } from "./parsePassportsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n");

const passports = parsePassportsFromLines(lines);
const validPassportCount = passports.filter((p) => checkPassportIsValid(p))
  .length;
console.log(validPassportCount);
