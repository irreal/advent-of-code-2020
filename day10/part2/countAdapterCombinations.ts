export function countAdapterCombinations(sortedAdapterArray: number[]): number {
  const pathCounts: { [key: number]: number } = [1];
  for (let i = 0; i < sortedAdapterArray.length; i++) {
    pathCounts[sortedAdapterArray[i]] =
      (pathCounts[sortedAdapterArray[i] - 1] ?? 0) +
      (pathCounts[sortedAdapterArray[i] - 2] ?? 0) +
      (pathCounts[sortedAdapterArray[i] - 3] ?? 0);
  }
  return pathCounts[sortedAdapterArray[sortedAdapterArray.length - 1]];
}
