export type Operand = "+" | "*";
export type Expression = {
  number?: number;
  subExpressions?: Expression[];
  operand?: Operand;
};
