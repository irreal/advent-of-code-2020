import { Passport, PassportKey } from "./Passport.ts";
import { requirement } from "./requirement.ts";

export const checkPassportPropsAreValid = (
  passport: Passport,
  requirements: { [key: string]: requirement }
): boolean => {
  const requirementProps = Object.keys(requirements);
  const passportKeys = Object.keys(passport);
  if (requirementProps.some((rk) => !passportKeys.includes(rk))) {
    return false;
  }

  let passportPropsValid = true;

  passportKeys.forEach((k) => {
    if (!passportPropsValid) {
      return;
    }
    if (!requirementProps.includes(k)) {
      return;
    }
    const requirement = requirements[k];
    let value = passport[k as PassportKey];

    const prefix = requirement.allowedPrefixes?.find((p) =>
      value?.startsWith(p)
    );
    if (prefix) {
      value = value?.slice(prefix.length);
    } else {
      if (requirement.prefixRequired) {
        passportPropsValid = false;
        return;
      }
    }

    const suffix = requirement.allowedSuffixes?.find((s) => value?.endsWith(s));
    if (suffix) {
      value = value?.slice(0, value.length - suffix.length);
    } else {
      if (requirement.suffixRequired) {
        passportPropsValid = false;
        return;
      }
    }

    if (requirement.minLength) {
      if ((value?.length ?? 0) < requirement.minLength) {
        passportPropsValid = false;
        return;
      }
    }

    if (requirement.maxLength) {
      if ((value?.length ?? 0) > requirement.maxLength) {
        passportPropsValid = false;
        return;
      }
    }

    if (requirement.parsesToNumber) {
      if (!value || value.length === 0) {
        passportPropsValid = false;
        return;
      }
      const numberValue = Number(value);
      if (isNaN(numberValue)) {
        passportPropsValid = false;
        return;
      }

      if (
        requirement.parsesToNumber.min &&
        numberValue < requirement.parsesToNumber.min
      ) {
        passportPropsValid = false;
        return;
      }

      if (
        requirement.parsesToNumber.max &&
        numberValue > requirement.parsesToNumber.max
      ) {
        passportPropsValid = false;
        return;
      }

      if (
        suffix &&
        requirement.parsesToNumber[`mins${suffix}`] &&
        numberValue < requirement.parsesToNumber[`mins${suffix}`]!
      ) {
        passportPropsValid = false;
        return;
      }

      if (
        suffix &&
        requirement.parsesToNumber[`maxs${suffix}`] &&
        numberValue > requirement.parsesToNumber[`maxs${suffix}`]!
      ) {
        passportPropsValid = false;
        return;
      }
    }

    if (requirement.oneOf && requirement.oneOf.length) {
      if (!value || !requirement.oneOf.includes(value)) {
        passportPropsValid = false;
        return;
      }
    }

    if (requirement.allowedChars && requirement.allowedChars.length) {
      if (!value) {
        return;
      }
      if (value.split("").some((l) => !requirement.allowedChars?.includes(l))) {
        passportPropsValid = false;
        return;
      }
    }
  });

  return passportPropsValid;
};
