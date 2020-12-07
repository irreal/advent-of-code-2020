import { BagWithCount } from "./BagWithCount.ts";

export const parseBagContents = (
  stringContents: string
): { color: string; contents: BagWithCount[] } => {
  if (!stringContents.includes("bags contain")) {
    throw new Error(
      "invalid input string. No 'bags contain' '" + stringContents + "'"
    );
  }

  const pair = stringContents.split("bags contain");
  if (pair.length !== 2) {
    throw new Error(`invalid input string. Splits into ${pair.length} parts`);
  }

  const color = getColor(pair[0]);
  const contents = getContents(pair[1]);
  return { color, contents };
};

function getColor(colorString: string): string {
  return colorString.trim();
}
function getContents(contents: string): BagWithCount[] {
  contents = contents.trim();
  if (!contents.endsWith(".")) {
    throw new Error("invalid input string, missing trailing dot " + contents);
  }
  const contentsWithoutTrailingDot = contents.slice(0, contents.length - 1);
  if (contentsWithoutTrailingDot === "no other bags") {
    return [];
  }
  const bags = contentsWithoutTrailingDot.split(",");
  const bagsWithCount: BagWithCount[] = [];
  bags.forEach((bag) => {
    const parts = bag.trim().split(" ");
    if (parts.length < 3) {
      throw new Error("invalid input string. bag missing parts " + bag);
    }
    const count = Number(parts[0]);
    if (isNaN(count)) {
      throw new Error("invalid input string. bag count is NaN " + bag);
    }
    const color = parts.slice(1, parts.length - 1).join(" ");
    bagsWithCount.push({ color, count });
  });
  return bagsWithCount;
}
