const contents2 = await Deno.readTextFile("input.txt");
const set2:number[] = [];
contents2.split('\n').forEach(line=>{
    const number = Number.parseInt(line);
    if (!isNaN(number)) {
        if (number <= 2020) {
            const complement = 2020 - number;
            for (let i = 0; i < set2.length; i++) {
                const attempt = set2[i];
                if (attempt <= complement) {
                    const complement2 = 2020-number-attempt;
                    for (let u = i+1; u < set2.length; u++) {
                        if (set2[u] === complement2) {
                            console.log('found it', number, attempt, set2[u], number*attempt*set2[u]);
                            Deno.exit();
                        }
                    }
                }
            }
        }
    set2.push(number);
    }
});
