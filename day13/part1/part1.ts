const contents = await Deno.readTextFile("../input.txt");
const inputData = contents.split("\n").filter((n) => n !== "");

const startTime = Number(inputData[0]);
console.log(startTime);

const busTimes = inputData[1]
  .split(",")
  .filter((t) => t !== "x")
  .map((t) => Number(t));
console.log(busTimes);

let earliest = 0;
let busId = 0;
busTimes.forEach((bt) => {
  let earliestOnOrAfterStartTime = bt;
  while (earliestOnOrAfterStartTime < startTime) {
    earliestOnOrAfterStartTime += bt;
  }
  if (earliest === 0) {
    earliest = earliestOnOrAfterStartTime;
    busId = bt;
  } else {
    if (earliestOnOrAfterStartTime < earliest) {
      earliest = earliestOnOrAfterStartTime;
      busId = bt;
    }
  }
});

console.log("earliest bus time is: ", earliest);
console.log("using bus ", busId);
console.log(
  `that time is ${earliest - startTime} minutes after our start time.`
);
console.log(
  `the final answer is: ${busId} * ${earliest - startTime} = ${
    busId * (earliest - startTime)
  }`
);
