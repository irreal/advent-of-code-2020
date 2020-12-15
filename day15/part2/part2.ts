const contents = await Deno.readTextFile("../input.txt");

const inputData = contents.split(",").map(Number);

const utterances = new Map<number, number>();

let turn = 1;
for (let i = 0; i < inputData.length - 1; i++) {
  utterances.set(inputData[i], turn);
  turn++;
}

let lastUtterance = inputData[inputData.length - 1];

while (turn < 30000000) {
  let newUtterance = 0;
  if (utterances.has(lastUtterance)) {
    newUtterance = turn - utterances.get(lastUtterance)!;
  } else {
    newUtterance = 0;
  }
  utterances.set(lastUtterance, turn);
  lastUtterance = newUtterance;
  turn++;
}

console.log(lastUtterance);
