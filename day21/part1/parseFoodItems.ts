import { FoodItem } from "./models.ts";
export function parseFoodItems(items: string[]): FoodItem[] {
  return items.map((i) => {
    const parts = i.split("(contains");
    const ingredients = parts[0]
      .split(" ")
      .map((i) => i.trim())
      .filter((i) => i !== "");
    const allergens: string[] = [];
    if (parts.length === 2) {
      parts[1]
        .slice(0, parts[1].length - 1)
        .split(",")
        .forEach((al) => allergens.push(al.trim()));
    }
    return {
      ingredients,
      allergens,
    };
  });
}
