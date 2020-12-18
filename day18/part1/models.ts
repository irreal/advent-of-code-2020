export type Expression = {
  operand: "+" | "*";
  leftHandSide: number | Expression;
  rightHandSide: number | Expression;
};
