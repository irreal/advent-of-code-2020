import { checkPassportStructureIsValid } from "./checkPassportStructureIsValid.ts";
import { Passport } from "./Passport.ts";

export const checkPassportIsValid = (passport: Passport): boolean => {
  return checkPassportStructureIsValid(passport);
};
