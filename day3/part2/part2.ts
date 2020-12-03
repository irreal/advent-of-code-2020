const contents = await Deno.readTextFile("input.txt");
const map = contents.split("\n");
const traverse = (moveX: number, moveY: number): number => {
  if (moveY <= 0) {
    throw new Error(
      "invalid Y move amount, will never reach bottom of map without a positive Y value"
    );
  }
  let treeHitCount = 0;
  console.log(map[0]);
  let x = 0;
  let y = 0;
  const mapWidth = map[0].length;
  while (y < map.length) {
    if (map[y][x] === "#") {
      treeHitCount++;
    }
    x += moveX;
    x %= mapWidth;
    y += moveY;
  }
  return treeHitCount;
};

const slopes: { x: number; y: number }[] = [
  { x: 1, y: 1 },
  { x: 3, y: 1 },
  { x: 5, y: 1 },
  { x: 7, y: 1 },
  { x: 1, y: 2 },
];
const values = slopes.map((s) => traverse(s.x, s.y));
console.log(values.reduce((total, cur) => (total *= cur)));
