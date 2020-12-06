export class Group {
  constructor(private answers: string[]) {}

  private getUniqueYesAnswerSet(): Set<string> {
    const set = new Set<string>();
    this.answers.forEach((a) => {
      for (let i = 0; i < a.length; i++) {
        set.add(a[i]);
      }
    });
    return set;
  }

  getUniqueAnswerCount(): number {
    return this.getUniqueYesAnswerSet().size;
  }
}
