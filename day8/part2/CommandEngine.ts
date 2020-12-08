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
  public execute(commands: Command[], startIndex = 0): CommandResult {
    let accValue = 0;
    const visitedIndexes = new Set<number>();
    let previousIndex = 0;
    let index = startIndex;

    while (index !== commands.length) {
      visitedIndexes.add(index);
      const { nextIndexOffset, accChange } = this.executeCommand(
        commands[index]
      );
      previousIndex = index;
      index += nextIndexOffset;
      accValue += accChange;

      if (visitedIndexes.has(index)) {
        return {
          isSuccess: false,
          errorMessage: "infinite loop detected",
          accValue,
        };
      } else if (index > commands.length) {
        return {
          isSuccess: false,
          errorMessage: "command jumped outside program range",
          accValue,
        };
      }
    }
    return {
      accValue,
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
