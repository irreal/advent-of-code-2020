import { BagWithCount } from "./BagWithCount.ts";
import { parseBagContents } from "./parseBagContents.ts";
export class BagContents {
  public readonly containedBags: BagWithCount[];
  public readonly color: string;
  constructor(stringContents: string) {
    const { color, contents } = parseBagContents(stringContents);
    this.color = color;
    this.containedBags = contents;
  }

  getTotalBagsContained(bagContents: { [key: string]: BagContents }): number {
    let count = 0;
    this.containedBags.forEach((cb) => {
      count +=
        cb.count +
        cb.count * bagContents[cb.color].getTotalBagsContained(bagContents);
    });
    return count;
  }
}
