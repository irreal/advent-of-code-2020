const initialCups = (await Deno.readTextFile("../input.txt"))
  .split("")
  .filter((c) => c !== "\n")
  .map((c) => Number(c));

const rounds = 100;

const cups = [...initialCups];
let currentCup = initialCups[0];
const minCup = Math.min(...cups);
const maxCup = Math.max(...cups);

for (let i = 0; i < rounds; i++) {
  let currentIndex = cups.indexOf(currentCup);
  while (currentIndex >= cups.length - 3) {
    cups.push(cups.shift()!);
    currentIndex = cups.indexOf(currentCup);
  }
  const pickedUpCups = cups.splice(currentIndex + 1, 3);

  let targetCupLabel = currentCup - 1;
  let targetIndex: number | null = null;
  while (targetIndex === null) {
    if (targetCupLabel < minCup) {
      targetCupLabel = maxCup;
    }
    targetIndex = cups.indexOf(targetCupLabel);
    if (targetIndex === -1) {
      targetIndex = null;
      targetCupLabel--;
    }
  }

  cups.splice(targetIndex + 1, 0, ...pickedUpCups);

  const newCurrentCupIndex = (cups.indexOf(currentCup) + 1) % cups.length;
  currentCup = cups[newCurrentCupIndex];
}

console.log("final cups: ", cups);
console.log("selected cup:", currentCup);

let answer = "";
let currentIndex = cups.indexOf(1) + (1 % cups.length);
while (cups[currentIndex] !== 1) {
  answer += cups[currentIndex].toString();
  currentIndex = (currentIndex + 1) % cups.length;
}
console.log("final answer: ", answer);
