import { verifyXMASEncoding } from "./verifyXmasEncoding.ts";
import { findContiguousSetForTargetNumber } from "./findContigousSetForTargetNumber.ts";

const contents = await Deno.readTextFile("../input.txt");
const numbers = contents
  .split("\n")
  .filter((l) => l !== "")
  .map((l) => Number(l));

// verifyXMASEncoding(numbers);
const result = verifyXMASEncoding(numbers);
console.log(result);
if (result.isSuccess) {
  throw new Error(
    "did not expect the initial input to not contain cypher weakness"
  );
}

const contigousSet = findContiguousSetForTargetNumber(
  numbers,
  result.valueOfIncorrectEntry!
);
console.log(contigousSet);

if (!contigousSet.resultFound) {
  throw new Error("could not find contigous set!");
}

const slice = numbers.slice(
  contigousSet.startIndex,
  contigousSet.endIndex! + 1
);
const smallestNumber = Math.min(...slice);
const largestNumber = Math.max(...slice);
console.log("smallest: ", smallestNumber);
console.log("largest: ", largestNumber);

console.log("Final result: ", smallestNumber + largestNumber);
