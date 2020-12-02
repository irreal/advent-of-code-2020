const compute2 = async (): Promise<void> => {
    const contents = await Deno.readTextFile("input.txt");
    let validCount = 0;
    contents.split('\n').forEach(line=>{
        const {firstPosition, secondPosition, char, pw} = parseRequirements2(line);
        let matchCount = 0;
        matchCount += pw[firstPosition-1] === char ? 1: 0;
        matchCount += pw[secondPosition-1] === char ? 1: 0;
        if (matchCount === 1) {
            validCount++;
        }
    });
    
    console.log(validCount);
    }
    
    
    const parseRequirements2 = (line: string): {firstPosition:number, secondPosition:number, char:string, pw: string} => {
        const firstPosition= parseInt(line.slice(0,line.indexOf('-')));
        const secondPosition= parseInt(line.slice(line.indexOf('-')+1, line.indexOf(' ')));
        const char= line.slice(line.indexOf(' ')+1, line.indexOf(':'));
        const pw = line.slice(line.indexOf(':')+2);
        return {firstPosition, secondPosition, char, pw};
    }
    
    compute2();