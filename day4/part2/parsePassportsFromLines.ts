import { parseLine } from "./parseLine.ts";
import { Passport, PassportKey } from "./Passport.ts";

export const parsePassportsFromLines = (lines: string[]): Passport[] => {
  const passports: Passport[] = [];
  let passport: Passport = {};
  let hasValues = false;
  lines.forEach((line) => {
    if (line === "") {
      if (hasValues) {
        passports.push(passport);
      }
      passport = {};
      hasValues = false;
      return;
    }
    const values = parseLine(line);
    Object.keys(values).forEach((k) => {
      hasValues = true;
      passport[k as PassportKey] = values[k];
    });
  });
  if (hasValues) {
    passports.push(passport);
  }
  return passports;
};
