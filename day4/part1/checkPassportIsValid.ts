import { Passport, PassportKey } from "./Passport.ts";

const requiredKeys = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];

export const checkPassportIsValid = (passport: Passport): boolean => {
  return !requiredKeys.some((rk) => {
    const key = rk as PassportKey;
    return passport[key] === undefined || passport[key] === "";
  });
};
