import { Command, CommandType } from "./Command.ts";

export function parseCommandsFromLines(lines: string[]): Command[] {
  return lines.map((l) => parseCommandFromLine(l));
}

function parseCommandFromLine(line: string): Command {
  const pair = line.split(" ");
  if (pair.length !== 2) {
    throw new Error(
      "invalid input. Command line does not include a pair of values. " + line
    );
  }

  return new Command(pair[0] as CommandType, parseInt(pair[1]));
}
