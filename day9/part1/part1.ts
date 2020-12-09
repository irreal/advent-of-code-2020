import { verifyXMASEncoding } from "./verifyXmasEncoding.ts";

const contents = await Deno.readTextFile("../input.txt");
const numbers = contents
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => Number(l));

// verifyXMASEncoding(numbers);
const result = verifyXMASEncoding(numbers);
console.log(result);
