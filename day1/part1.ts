const contents = await Deno.readTextFile("input.txt");
const set = new Set<number>();
contents.split('\n').forEach(line=>{
    const number = Number.parseInt(line);
    if (!isNaN(number)) {
        if (number <= 2020) {
            const complement = 2020 - number;
            if (set.has(complement)) {
                console.log('found! ', complement, number);
                console.log('multiplication: ', complement * number);
            }
            else {
                set.add(number);
            }
        }
    }
});
