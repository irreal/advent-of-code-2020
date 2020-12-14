import { Instruction } from "./parseInstructionsFromLines.ts";

export type ExecutionResult = {
  memoryValues: { [key: number]: number };
};

export class Engine {
  memory = {} as { [key: number]: number };
  constructor(
    private instructions: Instruction[],
    private defaultMemoryValue = 0
  ) {}

  executeAll(): ExecutionResult {
    let maskValues: ("X" | "1" | "0")[] = Array(36).fill("X");
    this.instructions.forEach((i) => {
      if (i.type === "mask") {
        maskValues = i.maskValues;
        return;
      }

      const binaryAddressValues = i.address
        .toString(2)
        .padStart(36, "0")
        .split("") as ("X" | "1" | "0")[];
      for (let i = 0; i < maskValues.length; i++) {
        if (maskValues[i] === "0") {
          continue;
        }
        binaryAddressValues[i] = maskValues[i];
      }
      this.writeValuesRecursively(binaryAddressValues, i.value);
    });
    return { memoryValues: this.memory };
  }

  writeValuesRecursively(
    binaryAddressValues: ("X" | "1" | "0")[],
    value: number
  ) {
    const index = binaryAddressValues.indexOf("X");
    if (index === -1) {
      this.memory[parseInt(binaryAddressValues.join(""), 2)] = value;
      return;
    }

    const varr = [...binaryAddressValues];
    varr[index] = "0";
    this.writeValuesRecursively(varr, value);
    varr[index] = "1";
    this.writeValuesRecursively(varr, value);
  }
}
