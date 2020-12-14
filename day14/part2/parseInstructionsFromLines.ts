export type MaskInstruction = {
  type: "mask";
  maskValues: ("0" | "1" | "X")[];
};
export type SetInstruction = {
  type: "set";
  address: number;
  value: number;
};

export type Instruction = MaskInstruction | SetInstruction;

export function parseInstructionsFromLines(lines: string[]): Instruction[] {
  const instructions: Instruction[] = [];
  lines.forEach((l) => {
    if (/mask/.test(l)) {
      const values = l.split(" ");
      const maskValues = values[2].split("");
      if (maskValues.some((mv) => !["1", "0", "X"].includes(mv))) {
        throw new Error("invalid mask value! " + l);
      }
      instructions.push({
        type: "mask",
        maskValues: maskValues as ("0" | "1" | "X")[],
      });
      return;
    }

    const addressMatches = /(?<=mem\[)\d+/.exec(l);
    if (!addressMatches || addressMatches.length !== 1) {
      throw new Error("invalid address definition " + l);
    }
    const address = Number(addressMatches[0]);
    const values = l.split(" ");
    const value = Number(values[values.length - 1]);
    instructions.push({
      type: "set",
      address,
      value,
    });
  });
  return instructions;
}
