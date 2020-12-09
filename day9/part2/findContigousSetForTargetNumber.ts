export type ContiguousSetResult = {
  resultFound: boolean;
  startIndex?: number;
  endIndex?: number;
};

export function findContiguousSetForTargetNumber(
  numbers: number[],
  target: number
): ContiguousSetResult {
  if (!numbers || numbers.length < 2) {
    return {
      resultFound: false,
    };
  }

  let startIndex = 0;
  let endIndex = 1;
  let acc = numbers[0] + numbers[1];
  while (endIndex < numbers.length) {
    if (acc === target) {
      return {
        resultFound: true,
        startIndex,
        endIndex,
      };
    }
    if (acc > target) {
      if (startIndex < endIndex - 1) {
        acc -= numbers[startIndex];
        startIndex++;
      } else {
        acc -= numbers[startIndex];
        startIndex++;
        endIndex++;
        if (endIndex < numbers.length) {
          acc += numbers[endIndex];
        }
      }
    } else if (acc < target) {
      endIndex++;
      if (endIndex < numbers.length) {
        acc += numbers[endIndex];
      }
    }
  }
  return {
    resultFound: false,
  };
}
