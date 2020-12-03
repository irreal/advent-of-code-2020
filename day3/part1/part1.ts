const contents = await Deno.readTextFile("input.txt");
let treeHitCount = 0;
const map = contents.split("\n");
let x = 0;
let y = 0;
const mapWidth = map[0].length;
while (y < map.length) {
  if (map[y][x] === "#") {
    treeHitCount++;
  }
  x += 3;
  x %= mapWidth;
  y += 1;
}
console.log(treeHitCount);
