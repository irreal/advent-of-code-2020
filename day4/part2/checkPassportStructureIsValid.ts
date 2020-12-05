import { Passport, PassportKey } from "./Passport.ts";

const requiredKeys = ["byr", "ecl", "eyr", "hcl", "hgt", "iyr", "pid"];

export const checkPassportStructureIsValid = (passport: Passport): boolean => {
  const validStructure = !requiredKeys.some((rk) => {
    const key = rk as PassportKey;
    return passport[key] === undefined || passport[key] === "";
  });
  return validStructure;
};
