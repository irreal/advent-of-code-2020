import { FoodItem } from "./models.ts";

export function generatePossibleCombinations(
  items: FoodItem[]
): { allergen: string; possibleIngredients: string[] }[] {
  const map = new Map<string, string[]>();
  items.forEach((i) => {
    i.allergens.forEach((ag) => {
      if (!map.has(ag)) {
        map.set(ag, i.ingredients);
      } else {
        const ingredients = [...map.get(ag)!];
        i.ingredients.forEach((i) => {
          if (!ingredients.includes(i)) {
            ingredients.push(i);
          }
        });
        map.set(ag, ingredients);
      }
    });
  });

  const combinations = Array.from(map.keys()).map((a) => ({
    allergen: a,
    possibleIngredients: map.get(a)!,
  }));

  const ingredients = new Set();
  combinations.forEach((cb) => {
    cb.possibleIngredients.forEach((ig) => {
      ingredients.add(ig);
    });
  });

  const safeIngredients = new Set<string>();
  items.forEach((fi) => {
    fi.ingredients.forEach((ing) => {
      if (!ingredients.has(ing)) {
        safeIngredients.add(ing);
      }
    });
  });

  console.log("safe: ", safeIngredients);
  console.log("len:", safeIngredients.size);
  //   const solved: string[] = [];
  //   while (true) {
  //     const solvedCombination = combinations.find(
  //       (ig) =>
  //         ig.possibleAllergens.length === 1 &&
  //         solved.find((s) => s === ig.possibleAllergens[0]) === undefined
  //     );
  //     if (!solvedCombination) {
  //       break;
  //     }
  //     solved.push(solvedCombination.possibleAllergens[0]);
  //     combinations = combinations.map((combination) => {
  //       if (combination.ingredient === solvedCombination.ingredient) {
  //         return combination;
  //       }
  //       const allergens = combination.possibleAllergens.filter(
  //         (a) => a !== solvedCombination.possibleAllergens[0]
  //       );
  //       return {
  //         ingredient: combination.ingredient,
  //         possibleAllergens: allergens,
  //       };
  //     });
  //   }

  return combinations;
}
