export function findClosingBraceIndex(input: string): number {
  if (input[0] !== "(") {
    throw new Error("invalid input, does not contain opening brace");
  }
  let braceCount = 1;
  let index = 1;
  let found = false;
  while (index < input.length) {
    if (input[index] === "(") {
      braceCount++;
    } else if (input[index] === ")") {
      braceCount--;
    }
    if (braceCount === 0) {
      found = true;
      break;
    }
    index++;
  }
  if (!found) {
    throw new Error("malformed input, closing brace was not found!");
  }
  return index;
}
