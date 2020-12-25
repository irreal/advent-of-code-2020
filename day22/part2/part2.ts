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
const p1Initial = [...player1];
const p2Initial = [...player2];

function playRecursiveGame(player1: number[], player2: number[]): "p1" | "p2" {
  const previousHands: { p1: number[]; p2: number[] }[] = [];
  let winner: "p1" | "p2" | null = null;
  while (player1.length > 0 && player2.length > 0) {
    if (
      previousHands.find((ph) => {
        const intersection1 = intersection(player1, ph.p1);
        if (
          intersection1.length === player1.length &&
          ph.p1.length === player1.length
        ) {
          const intersection2 = intersection(player2, ph.p2);
          if (
            intersection2.length === player2.length &&
            ph.p2.length === player2.length
          ) {
            return true;
          }
        }
        return false;
      })
    ) {
      winner = "p1";
      break;
    }
    previousHands.push({ p1: [...player1], p2: [...player2] });

    const p1Card = player1.shift()!;
    const p2Card = player2.shift()!;

    if (player1.length >= p1Card && player2.length >= p2Card) {
      winner = playRecursiveGame(
        player1.slice(0, p1Card),
        player2.slice(0, p2Card)
      );
    } else {
      winner = p1Card > p2Card ? "p1" : "p2";
    }

    if (winner === "p1") {
      player1.push(p1Card);
      player1.push(p2Card);
    } else {
      player2.push(p2Card);
      player2.push(p1Card);
    }
  }
  return player1.length > 0 ? "p1" : "p2";
}
const mainWinner = playRecursiveGame(player1, player2);
const winnerDeck = mainWinner === "p1" ? player1 : player2;

let score = 0;
for (let i = 0; i < winnerDeck.length; i++) {
  score += (winnerDeck.length - i) * winnerDeck[i];
}

console.log("final score: ", score);

function intersection(a: number[], b: number[]) {
  const s = new Set(b);
  return [...new Set(a)].filter((x) => s.has(x));
}
