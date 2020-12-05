import { parseSeatsFromLines } from "./parseSeatsFromLines.ts";
import { Seat } from "./Seat.ts";
const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n");

const seats: Seat[] = parseSeatsFromLines(lines).sort((a, b) => a.id - b.id);
for (let i = 0; i < seats.length - 1; i++) {
  const seatId = seats[i].id;
  if (seats[i + 1].id === seatId + 2) {
    console.log("found it", seats[i].id + 1);
  }
}
