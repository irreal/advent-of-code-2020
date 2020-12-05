import { Passport, PassportKey } from "./Passport.ts";

type requirement = {
  minLength?: number;
  maxLength?: number;
  hasSuffix?: string[];
  hasPrefix?: string[];
  parsesToNumber?: {
    min?: number | undefined;
    max?: number | undefined;
    [key: string]: number | undefined;
  };
  allowedChars?: string[];
  oneOf?: string[];
};

const requirements: { [key: string]: requirement } = {
  byr: {
    parsesToNumber: { min: 1920, max: 2002 },
    minLength: 4,
    maxLength: 4,
  },
  ecl: {
    oneOf: ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
  },
  eyr: {
    parsesToNumber: { min: 2020, max: 2030 },
    minLength: 4,
    maxLength: 4,
  },
  hcl: {
    hasPrefix: ["#"],
    minLength: 6,
    maxLength: 6,
    allowedChars: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ],
  },
  hgt: {
    hasSuffix: ["cm", "in"],
    parsesToNumber: {
      cmMin: 150,
      cmMax: 193,
      inMin: 59,
      inMax: 76,
    },
  },
  iyr: {
    parsesToNumber: { min: 2010, max: 2020 },
    minLength: 4,
    maxLength: 4,
  },
  pid: {
    minLength: 9,
    maxLength: 9,
    allowedChars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  },
};

export const checkPassportPropsAreValid = (passport: Passport): boolean => {
  return false;
};
