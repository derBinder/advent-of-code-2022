import {rawData} from "./input";

main();

function main() {
    const elfs: string[] = buildElfArray(rawData)
    const topThree: number[] = [];

    for (let i = 0; i < 3; i++) {
        topThree.push(calcMaxCals(elfs));
    }

    console.log(calcCalsOfTopThree(topThree));
}

function calcCalsOfTopThree(topThree: number[]) {
    let result = 0;

    topThree.forEach(x => result += x);

    return result;
}

function calcMaxCals(elfs: string[]) {
    let max = 0;
    let index = -1;

    elfs.forEach((x, i) => {
        const result = eval(x);
        if (result > max) {
            max = result;
            index = i;
        }
    });

    delete elfs[index];
    return max;
}

function buildElfArray(rawData: string) {
    const cals = rawData.split('\n\n')

    for (let i = 0; i < cals.length; i++) cals[i] = cals[i].replace(/\n/g, ' + ');

    return cals;
}
