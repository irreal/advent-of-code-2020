import { Seat } from "./Seat.ts";

export const parseSeatsFromLines = (lines: string[]): Seat[] => {
  return lines.map((l) => {
    let min = 0;
    let max = 128;
    let row = 0;
    let column = 0;
    for (let i = 0; i < 7; i++) {
      const next = min + (max - min) / 2;
      if (l[i] === "B") {
        min = next;
      } else {
        max = next;
      }
    }
    row = max - 1;

    min = 0;
    max = 8;
    for (let i = 7; i < 10; i++) {
      const next = min + (max - min) / 2;
      if (l[i] === "R") {
        min = next;
      } else {
        max = next;
      }
    }

    column = max - 1;

    return new Seat(row, column);
  });
};
