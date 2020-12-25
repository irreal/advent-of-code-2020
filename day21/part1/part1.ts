import { generatePossibleCombinations } from "./generatePossibleCombinations.ts";
import { parseFoodItems } from "./parseFoodItems.ts";

const contents = await Deno.readTextFile("../example.txt");

const lines = contents.split("\n").filter((l) => l !== "");

const foodItems = parseFoodItems(lines);

const possibleCombinations = generatePossibleCombinations(foodItems);

console.log(possibleCombinations);
