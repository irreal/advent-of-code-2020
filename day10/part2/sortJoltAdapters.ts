export type SortJoltAdaptersResult = {
  isValid: boolean;
  joltDifferences: { "1": number; "2": number; "3": number };
  deviceVoltage: number;
  sortedJolts: number[];
};
export function sortJoltAdapters(jolts: number[]): SortJoltAdaptersResult {
  const sortedJolts = jolts.sort((a, b) => a - b);
  sortedJolts.push(sortedJolts[sortedJolts.length - 1] + 3);
  const differences: { [key: string]: number } = { "1": 0, "2": 0, "3": 0 };
  let previous = 0;
  let valid = true;
  for (let i = 0; i < sortedJolts.length; i++) {
    const diff = sortedJolts[i] - previous;
    if (diff < 1 || diff > 3) {
      valid = false;
    }
    differences[diff.toString()]++;
    previous = sortedJolts[i];
  }
  return {
    isValid: valid,
    deviceVoltage: sortedJolts[sortedJolts.length - 1],
    joltDifferences: differences as { "1": number; "2": number; "3": number },
    sortedJolts,
  };
}
