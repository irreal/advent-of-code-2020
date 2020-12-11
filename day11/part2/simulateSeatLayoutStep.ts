export type SeatType = "." | "L" | "#";
export type SeatLayoutStepResult = {
  newLayout: string[];
  hasChanged: boolean;
};
export function simulateSeatLayoutStep(
  seatLayout: string[]
): SeatLayoutStepResult {
  const newLayout: string[] = [];
  let hasChanged = false;
  for (let y = 0; y < seatLayout.length; y++) {
    let newRow = "";
    for (let x = 0; x < seatLayout[y].length; x++) {
      const seat = seatLayout[y][x] as SeatType;
      switch (seat) {
        case ".":
          newRow += ".";
          break;
        case "L":
          if (getCountOfOccupiedSeatsAroundCoordinate(seatLayout, x, y) === 0) {
            newRow += "#";
          } else {
            newRow += "L";
          }
          break;
        case "#":
          if (getCountOfOccupiedSeatsAroundCoordinate(seatLayout, x, y) >= 5) {
            newRow += "L";
          } else {
            newRow += "#";
          }
      }
    }
    newLayout.push(newRow);
    if (newLayout[newLayout.length - 1] !== seatLayout[newLayout.length - 1]) {
      hasChanged = true;
    }
  }

  return {
    hasChanged,
    newLayout,
  };
}

function getCountOfOccupiedSeatsAroundCoordinate(
  layout: string[],
  x: number,
  y: number
): number {
  let count = 0;
  for (let yOffset = -1; yOffset <= 1; yOffset++) {
    for (let xOffset = -1; xOffset <= 1; xOffset++) {
      if (xOffset === 0 && yOffset === 0) {
        continue;
      }
      let seat: SeatType | null = ".";
      let step = 1;
      while (seat === ".") {
        seat = getSeatByCoordinate(
          layout,
          x + xOffset * step,
          y + yOffset * step
        );
        step++;
      }
      if (seat === "#") count++;
    }
  }
  return count;
}

function getSeatByCoordinate(
  layout: string[],
  x: number,
  y: number
): SeatType | null {
  if (y < 0 || x < 0 || y >= layout.length) {
    return null;
  }
  if (x >= layout[y].length) {
    return null;
  }
  return layout[y][x] as SeatType;
}
