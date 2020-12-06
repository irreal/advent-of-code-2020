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

  private getCommonAnswerSet(): Set<string> {
    const set = new Set<string>();
    if (!this.answers.length) {
      return set;
    }

    for (let i = 0; i < this.answers[0].length; i++) {
      set.add(this.answers[0][i]);
    }

    const commonSet = new Set<string>();
    set.forEach((answer) => {
      if (this.answers.every((a) => a.includes(answer))) {
        commonSet.add(answer);
      }
    });

    return commonSet;
  }

  getUniqueAnswerCount(): number {
    return this.getUniqueYesAnswerSet().size;
  }

  getCommonAnswerCount(): number {
    return this.getCommonAnswerSet().size;
  }
}
