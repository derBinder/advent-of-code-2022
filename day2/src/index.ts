import {rawData} from "./input";

main();

function main() {
    const instructions: string[] = getInstructions();
    const calcTable: Record<string, number> = {};
    calcTable['A'] = 1;
    calcTable['B'] = 2;
    calcTable['C'] = 3;

    let score: number = 0;

    instructions.forEach(x => {
        const a = x.split(' ')[0];
        const b = x.split(' ')[1];

        const shape: string = getShape(a, b);

        if (b === 'Z') score += calcTable[shape] + 6;
        else if (b === 'Y') score += calcTable[shape] + 3;
        else score += calcTable[shape];
    });

    console.log(score);
}


function getShape(a: string, b: string): string {
    // A: Rock
    // B: Paper
    // C: Scissors
    // X: Lose
    // Y: Draw
    // Z: Win

    if (b === 'Y') return a;
    else if (a === 'A' && b === 'X') return 'C';
    else if (a === 'A' && b === 'Z') return 'B';
    else if (a === 'B' && b === 'X') return 'A';
    else if (a === 'B' && b === 'Z') return 'C';
    else if (a === 'C' && b === 'X') return 'B';
    else if (a === 'C' && b === 'Z') return 'A';
    return '';
}

function getInstructions() {
    return rawData.split('\n');
}
