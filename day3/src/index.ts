import {rawData} from "./input";

main();

function main() {
    let sum: number = 0;

    getGroups().forEach(group => sum += getPriority(getBadge(group)));
    console.log(sum);
}

function getPriority(wrongItem: string): number {
    return wrongItem.charCodeAt(0) >= 97 ? wrongItem.charCodeAt(0) - 96 : wrongItem.charCodeAt(0) - 38;
}

function getBadge(group: string[]) {
    return group[0].split('').find(item => group[1].split('').includes(item) && group[2].split('').includes(item));
}

function getGroups() {
    const data = rawData.split('\n');
    const n = 3;
    const groups: any = [];
    for (let i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0) j++;
        groups[j] = groups[j] || [];
        groups[j].push(data[i])
    }

    return groups;
}
