import { Command } from "./Command.ts";
import { CommandEngine } from "./CommandEngine.ts";
import { parseCommandsFromLines } from "./parseCommandsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n").filter((l) => l !== "");

const commands: Command[] = parseCommandsFromLines(lines);

const engine = new CommandEngine(commands);
const result = engine.execute();

console.log(result);
