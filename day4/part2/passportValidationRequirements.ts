import { requirement } from "./requirement.ts";

export const passportValidationRequirements: { [key: string]: requirement } = {
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
    allowedPrefixes: ["#"],
    prefixRequired: true,
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
    allowedSuffixes: ["cm", "in"],
    suffixRequired: true,
    parsesToNumber: {
      minscm: 150,
      maxscm: 193,
      minsin: 59,
      maxsin: 76,
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
