import { Group } from "./Group.ts";

export const parseGroupsFromLines = (lines: string[]): Group[] => {
  const groups: Group[] = [];
  let group: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === "") {
      groups.push(new Group(group));
      group = [];
    } else {
      group.push(lines[i]);
    }
  }
  return groups;
};
