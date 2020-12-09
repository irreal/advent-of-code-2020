export type EncodingVerificationResult = {
  isSuccess: boolean;
  indexOfIncorrectEntry?: number;
  valueOfIncorrectEntry?: number;
};
export function verifyXMASEncoding(
  numbers: number[],
  preamble = 25
): EncodingVerificationResult {
  for (let i = preamble; i < numbers.length; i++) {
    const target = numbers[i];
    let found = false;
    for (let firstPair = i - preamble; firstPair < i; firstPair++) {
      if (found) {
        break;
      }
      if (numbers[firstPair] > target) {
        continue;
      }
      for (let secondPair = i - 1; secondPair > firstPair; secondPair--) {
        if (numbers[firstPair] + numbers[secondPair] === target) {
          found = true;
          break;
        }
      }
    }
    if (!found) {
      return {
        isSuccess: false,
        indexOfIncorrectEntry: i,
        valueOfIncorrectEntry: numbers[i],
      };
    }
  }
  return {
    isSuccess: true,
  };
}
