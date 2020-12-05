export type requirement = {
  minLength?: number;
  maxLength?: number;
  allowedSuffixes?: string[];
  allowedPrefixes?: string[];
  prefixRequired?: boolean;
  suffixRequired?: boolean;
  parsesToNumber?: {
    min?: number | undefined;
    max?: number | undefined;
    [key: string]: number | undefined;
  };
  allowedChars?: string[];
  oneOf?: string[];
};
