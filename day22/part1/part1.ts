const contents = await Deno.readTextFile("../input.txt");

const players = contents.split("\n\n");

const player1 = players[0]
  .split("\n")
  .slice(1)
  .map((n) => Number(n));
const player2 = players[1]
  .split("\n")
  .slice(1, -1)
  .map((n) => Number(n));

let turn = 0;
while (player1.length > 0 && player2.length > 0) {
  turn++;
  console.log("playing turn ", turn);
  const p1Card = player1.shift()!;
  const p2Card = player2.shift()!;

  if (p1Card > p2Card) {
    player1.push(p1Card);
    player1.push(p2Card);
  } else {
    player2.push(p2Card);
    player2.push(p1Card);
  }
}

const winner = player1.length > 0 ? [...player1] : [...player2];

let score = 0;
for (let i = 0; i < winner.length; i++) {
  score += (winner.length - i) * winner[i];
}

console.log("final score: ", score);
