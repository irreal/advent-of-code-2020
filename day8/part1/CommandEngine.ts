import { Command } from "./Command.ts";
import { UnreachableCaseError } from "./UnreachableCaseError.ts";
export type CommandResult = {
  isSuccess: boolean;
  errorMessage?:
    | "infinite loop detected"
    | "command jumped outside program range";
  accValue: number;
};

export class CommandEngine {
  private accValue = 0;
  private visitedIndexes = new Set<number>();
  constructor(private commands: Command[]) {}

  public execute(startIndex = 0): CommandResult {
    let index = startIndex;

    while (index !== this.commands.length) {
      this.visitedIndexes.add(index);
      const { nextIndexOffset, accChange } = this.executeCommand(
        this.commands[index]
      );
      index += nextIndexOffset;
      this.accValue += accChange;

      if (this.visitedIndexes.has(index)) {
        return {
          isSuccess: false,
          errorMessage: "infinite loop detected",
          accValue: this.accValue,
        };
      } else if (index > this.commands.length) {
        return {
          isSuccess: false,
          errorMessage: "command jumped outside program range",
          accValue: this.accValue,
        };
      }
    }
    return {
      accValue: this.accValue,
      isSuccess: true,
    };
  }

  private executeCommand(
    cmd: Command
  ): { nextIndexOffset: number; accChange: number } {
    switch (cmd.command) {
      case "nop":
        return { nextIndexOffset: 1, accChange: 0 };
      case "acc":
        return { nextIndexOffset: 1, accChange: cmd.value };
      case "jmp":
        return { nextIndexOffset: cmd.value, accChange: 0 };
      default:
        throw new UnreachableCaseError(cmd.command);
    }
  }
}
