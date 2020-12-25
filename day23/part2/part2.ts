const initialCups = (await Deno.readTextFile("../input.txt"))
  .split("")
  .filter((c) => c !== "\n")
  .map((c) => Number(c));

const rounds = 10000000;

const highestInputCup = Math.max(...initialCups);

for (let i = highestInputCup + 1; i <= 1000000; i++) {
  initialCups.push(i);
}

const cups = [...initialCups];
let currentCup = initialCups[0];
const minCup = 1;
const maxCup = 1000000;

for (let i = 0; i < rounds; i++) {
  if (i % 1000000 === 0) {
    console.log("playin round ", i);
  }
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

console.log("done shuffling!");

const nextIndex = (cups.indexOf(1) + 1) % cups.length;
const secondNextIndex = (nextIndex + 1) % cups.length;
console.log("final answer: ", cups[nextIndex] * cups[secondNextIndex]);
