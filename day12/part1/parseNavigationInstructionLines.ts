export type MoveInstruction = {
  direction: "N" | "E" | "S" | "W" | "F";
  amount: number;
  type: "move";
};
export type RotateInstruction = {
  direction: "L" | "R";
  amount: number;
  type: "rotate";
};
export type NavigationInstruction = MoveInstruction | RotateInstruction;

export function parseNavigationInstructionLines(
  lines: string[]
): NavigationInstruction[] {
  return lines.map((l) => {
    const value = Number(l.slice(1));
    if (isNaN(value)) {
      throw new Error(
        "error parsing value from navigation instruction line: " + l
      );
    }
    if (!["N", "E", "S", "W", "F", "R", "L"].includes(l[0])) {
      throw new Error(
        "error parsing command from navigation instruction line: " + l
      );
    }

    if (l[0] === "R" || l[0] === "L") {
      return {
        type: "rotate",
        direction: l[0],
        amount: value,
      } as RotateInstruction;
    }
    return { type: "move", direction: l[0], amount: value } as MoveInstruction;
  });
}
