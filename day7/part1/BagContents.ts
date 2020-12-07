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
}
