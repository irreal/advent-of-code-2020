export const parseLine = (line: string): { [key: string]: string } => {
  const result: { [key: string]: string } = {};
  line.split(" ").forEach((prop) => {
    const pair = prop.split(":");
    if (pair.length !== 2 || pair[1] === "") {
      throw new Error("malformed input!");
    }
    result[pair[0]] = pair[1];
  });
  return result;
};
