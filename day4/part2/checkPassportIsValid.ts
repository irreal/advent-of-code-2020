import { checkPassportStructureIsValid } from "./checkPassportStructureIsValid.ts";
import { checkPassportPropsAreValid } from "./checkPassportPropsAreValid.ts";
import { passportValidationRequirements } from "./passportValidationRequirements.ts";
import { Passport } from "./Passport.ts";

export const checkPassportIsValid = (passport: Passport): boolean => {
  return (
    checkPassportStructureIsValid(passport) &&
    checkPassportPropsAreValid(passport, passportValidationRequirements)
  );
};
