export type Rule = {
  name: string;
  ranges: { min: number; max: number }[];
};

export type Ticket = {
  values: number[];
};
