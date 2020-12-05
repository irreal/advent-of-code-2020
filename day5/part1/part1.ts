import { parseSeatsFromLines } from "./parseSeatsFromLines.ts";
import { Seat } from "./Seat.ts";
const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n");

const seats: Seat[] = parseSeatsFromLines(lines);

console.log(
  "Highest id: " +
    seats.reduce<number>((max, cur) => (cur.id > max ? cur.id : max), 0)
);
