import { Instruction } from "./parseInstructionsFromLines.ts";

export type ExecutionResult = {
  memoryValues: { [key: number]: number };
};

export class Engine {
  constructor(
    private instructions: Instruction[],
    private defaultMemoryValue = 0
  ) {}

  executeAll(): ExecutionResult {
    let maskValues: ("X" | "1" | "0")[] = Array(36).fill("X");
    const memory = {} as { [key: number]: number };
    this.instructions.forEach((i) => {
      if (i.type === "mask") {
        maskValues = i.maskValues;
        return;
      }

      const binaryValues = i.value.toString(2).padStart(36, "0").split("");
      for (let i = 0; i < maskValues.length; i++) {
        if (maskValues[i] === "X") {
          continue;
        }
        binaryValues[i] = maskValues[i];
      }

      const value = parseInt(binaryValues.join(""), 2);
      memory[i.address] = value;
    });
    return { memoryValues: memory };
  }
}
