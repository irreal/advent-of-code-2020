export type Passport = {
  eyr?: string;
  iyr?: string;
  hcl?: string;
  byr?: string;
  ecl?: string;
  hgt?: string;
  pid?: string;
  cid?: string;
};
export type PassportKey = Extract<keyof Passport, string>;
