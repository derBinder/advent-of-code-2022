import {rawData} from "./input";

const input: string[] = rawData.split('\n');

main();

function main() {
    let calls = 0;
    const rootIndex = findRootIndex();

    console.log(findNumberWithHuman('humn'));

    // while (!isYellNumber(rootIndex)) {
    //     replaceNameWithNumber();
    //     calls++;
    //     console.log('Call: ' + calls);
    // }
    //
    // console.log('Root: ' + getNumber(rootIndex));
}

function findNumberWithHuman(nameToFind: string): string {
    const nameIndex = input.findIndex(x => x.split(': ')[1].includes(nameToFind));
    const name = input[nameIndex].split(': ')[0];

    if (name !== 'root') {
        if (findNumberWithHuman(name) === 'root') {
            return name;
        }

        return findNumberWithHuman(name);
    } else {
        return name;
    }
}

function replaceNameWithNumber() {
    for (let i = 0; i < input.length; i++) {
        let x = input[i];
        const index = input.indexOf(x);

        if (isYellNumber(index)) {
            const name = getName(index);
            const number = getNumber(index);

            for (let j = 0; j < input.length; j++) {
                if (!isYellNumber(j)) {
                    input[j] = input[j].replace(name, number);
                }

                if (isYellCalculation(j)) {
                    input[j] = input[j].split(': ')[0]
                        + ': '
                        + eval(input[j].split(': ')[1]);
                    break;
                }
            }
        }
    }
}

function getName(index: number): string {
    return input[index].split(': ')[0];
}

function getNumber(index: number): string {
    return input[index].split(': ')[1];
}

function findRootIndex(): number {
    return input.findIndex(x => x.split(': ')[0] === 'root');
}

function isYellNumber(index: number): boolean {
    return /^\d+$/.test(input[index].split(': ')[1]);
}

function isYellCalculation(index: number): boolean {
    return /^\d+\s[+\-*/]\s\d+$/.test(input[index].split(': ')[1]);
}
