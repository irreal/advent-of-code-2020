export type CommandType = "nop" | "acc" | "jmp";
export class Command {
  constructor(public command: CommandType, public value: number) {}
}
