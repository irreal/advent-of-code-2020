import { Command } from "./Command.ts";
import { CommandEngine } from "./CommandEngine.ts";
import { parseCommandsFromLines } from "./parseCommandsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n").filter((l) => l !== "");

const commands: Command[] = parseCommandsFromLines(lines);

const engine = new CommandEngine();
const initialAttempt = engine.execute(commands);

for (let i = 0; i < commands.length; i++) {
  if (commands[i].command === "nop" || commands[i].command === "jmp") {
    commands[i].command = commands[i].command === "nop" ? "jmp" : "nop";
    const result = engine.execute(commands);
    if (result.isSuccess) {
      console.log("success!", result);
      break;
    }
    commands[i].command = commands[i].command === "nop" ? "jmp" : "nop";
  }
}
