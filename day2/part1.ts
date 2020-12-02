const compute = async (): Promise<void> => {
const contents = await Deno.readTextFile("input.txt");
let validCount = 0;
contents.split('\n').forEach(line=>{
    const {min, max, char, pw} = parseRequirements(line);
    const countOfCharInPw = countSubstringInString(pw,char);
    if (countOfCharInPw >= min && countOfCharInPw <= max) {
        validCount++;
    }
});

console.log(validCount);
}


const countSubstringInString = (string: string, substring:string): number => {
    if (string.length === 0) {
        return 0;
    }
    if (substring.length === 0) {
        return string.length;
    }

    let count = 0;
    let indexOf = string.indexOf(substring);

    while (indexOf > -1) {
        count++;
        string = string.slice(indexOf + substring.length);
        indexOf = string.indexOf(substring);
    }
    return count;
}

const parseRequirements = (line: string): {min:number, max:number, char:string, pw: string} => {
    const min= parseInt(line.slice(0,line.indexOf('-')));
    const max= parseInt(line.slice(line.indexOf('-')+1, line.indexOf(' ')));
    const char= line.slice(line.indexOf(' ')+1, line.indexOf(':'));
    const pw = line.slice(line.indexOf(':')+2);
    return {min, max, char, pw};
}

compute();