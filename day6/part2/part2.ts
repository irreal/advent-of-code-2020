import { Group } from "./Group.ts";
import { parseGroupsFromLines } from "./parseGroupsFromLines.ts";

const contents = await Deno.readTextFile("../input.txt");
const lines = contents.split("\n");

const groups: Group[] = parseGroupsFromLines(lines);
console.log(
  "total count: ",
  groups.reduce((count, curr) => {
    count += curr.getCommonAnswerCount();
    return count;
  }, 0)
);
