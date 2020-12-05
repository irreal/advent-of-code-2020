export class Seat {
  constructor(public row: number, public column: number) {}
  get id(): number {
    return this.row * 8 + this.column;
  }
}
