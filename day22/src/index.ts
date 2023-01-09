import {rawData} from "./input";
import {Player} from "./player";
import {Facing} from "./facing";

let cbCopy: string[][] = [];

main();

function main() {
    const data: string[] = rawData.split('\n');
    const instructions: string[] = getInstructions(data);
    const gameBoard: string[][] = buildGameBoard(data);
    cbCopy = buildGameBoard(data);
    const player = new Player(0, findStart(data), Facing.right);

    cbCopy[player.row][player.column] = player.facing;

    try {
        do {
            move(instructions, player, gameBoard);
        } while (instructions.length > 0)

        // print(player);
        console.log('---> Result: ' + calc(player));
    } catch (e) {
        print(player);
        console.error(e);
    }
}

function calc(player: Player) {
    let result = 1000 * (player.row + 1) + 4 * (player.column + 1);

    switch (player.facing) {
        case Facing.right:
            result += 0;
            break;
        case Facing.left:
            result += 2;
            break;
        case Facing.down:
            result += 1;
            break;
        case Facing.up:
            result += 3;
            break;
    }

    return result;
}

function print(player: Player) {
    if (cbCopy[player.row] && cbCopy[player.row][player.column]) cbCopy[player.row][player.column] = player.facing;

    for (let i = 0; i < cbCopy.length; i++) {
        for (let j = 0; j < cbCopy[i].length; j++) {
            process.stdout.write(cbCopy[i][j]);
        }
        console.log();
    }
}

function move(instructions: string[], player: Player, gameBoard: string[][]) {
    if (isNextStepWalk(instructions)) {
        walk(instructions[0], player, gameBoard);
    } else {
        turn(instructions[0], player, gameBoard);
    }

    if (cbCopy[player.row] && cbCopy[player.row][player.column]) cbCopy[player.row][player.column] = player.facing;

    instructions.shift();
}

function turn(instruction: string, player: Player, gameBoard: string[][]) {
    if (instruction === 'R') {
        switch (player.facing) {
            case Facing.up:
                player.facing = Facing.right;
                break;
            case Facing.down:
                player.facing = Facing.left;
                break;
            case Facing.left:
                player.facing = Facing.up;
                break;
            case Facing.right:
                player.facing = Facing.down;
                break;
        }
    } else {
        switch (player.facing) {
            case Facing.up:
                player.facing = Facing.left;
                break;
            case Facing.down:
                player.facing = Facing.right;
                break;
            case Facing.left:
                player.facing = Facing.down;
                break;
            case Facing.right:
                player.facing = Facing.up;
                break;
        }
    }
    if (cbCopy[player.row] && cbCopy[player.row][player.column]) cbCopy[player.row][player.column] = player.facing;
}

function walk(instruction: string, player: Player, gameBoard: string[][]) {
    for (let i = 0; i < Number(instruction); i++) {

        if (player.facing === Facing.right) {
            if (!isInFrontOfAWall(gameBoard, player)) {
                if (isInFrontOfABorder(gameBoard, player)) {
                    player.column = gameBoard[player.row].findIndex(x => x === '.');
                } else {
                    player.column++;
                }
            } else {
                break;
            }
        }

        if (player.facing === Facing.left) {
            if (!isInFrontOfAWall(gameBoard, player)) {
                if (isInFrontOfABorder(gameBoard, player)) {
                    player.column = gameBoard[player.row].lastIndexOf('.');
                } else {
                    player.column--;
                }
            } else {
                break;
            }
        }

        if (player.facing === Facing.up) {
            if (!isInFrontOfAWall(gameBoard, player)) {
                if (isInFrontOfABorder(gameBoard, player)) {
                    let start;
                    for (let i = gameBoard.length; i >= 0; i--) {
                        if (gameBoard[i] === undefined) continue;
                        if (gameBoard[i][player.column] !== ' ' && gameBoard[i][player.column] !== undefined) {
                            start = i;
                            break;
                        }
                    }
                    player.row = Number(start);
                } else {
                    player.row--;
                }
            } else {
                break;
            }
        }

        if (player.facing === Facing.down) {
            if (!isInFrontOfAWall(gameBoard, player)) {
                if (isInFrontOfABorder(gameBoard, player)) {
                    let start;
                    for (let i = 0; i < gameBoard.length; i++) {
                        if (gameBoard[i][player.column] !== ' ') {
                            start = i;
                            break;
                        }
                    }
                    player.row = Number(start);
                } else {
                    player.row++;
                }
            } else {
                break;
            }
        }

        if (cbCopy[player.row] && cbCopy[player.row][player.column]) cbCopy[player.row][player.column] = player.facing;
    }
}

function isInFrontOfAWall(gameBoard: string[][], player: Player): boolean {
    let isWall: boolean = false;

    if (isInFrontOfABorder(gameBoard, player)) {
        if (player.facing == Facing.right) {
            const firstDot = gameBoard[player.row].findIndex(x => x === '.');
            const firstWall = gameBoard[player.row].findIndex(x => x === '#');
            if (firstDot > firstWall) isWall = true;
        } else if (player.facing === Facing.left) {
            const firstDot = gameBoard[player.row].lastIndexOf('.');
            const firstWall = gameBoard[player.row].lastIndexOf('#');
            if (firstDot < firstWall) isWall = true;
        } else if (player.facing === Facing.up) {
            let start;
            for (let i = gameBoard.length; i >= 0; i--) {
                if (gameBoard[i] === undefined) continue;
                if (gameBoard[i][player.column] !== ' ' && gameBoard[i][player.column] !== undefined) {
                    start = i;
                    break;
                }
            }

            let firstWall;
            for (let i = gameBoard.length; i >= 0; i--) {
                if (gameBoard[i] === undefined) continue;
                if (gameBoard[i][player.column] === '#' && gameBoard[i][player.column] !== undefined) {
                    firstWall = i;
                    break;
                }
            }

            if (start === firstWall) isWall = true;
        } else if (player.facing === Facing.down) {
            let start;
            for (let i = 0; i < gameBoard.length; i++) {
                if (gameBoard[i][player.column] !== ' ') {
                    start = i;
                    break;
                }
            }
            const firstWall = gameBoard.findIndex(x => x[player.column] === '#');

            if (start === firstWall) isWall = true;
        }
    } else if (player.facing === Facing.right && gameBoard[player.row][player.column + 1] === '#') isWall = true;
    else if (player.facing === Facing.left && gameBoard[player.row][player.column - 1] === '#') isWall = true;
    else if (player.facing === Facing.up && gameBoard[player.row - 1][player.column] === '#') isWall = true;
    else if (player.facing === Facing.down && gameBoard[player.row + 1][player.column] === '#') isWall = true;

    return isWall;
}

function isInFrontOfABorder(gameBoard: string[][], player: Player): boolean {
    let isBorder: boolean = false;

    if (player.facing == Facing.up && player.row == 0) isBorder = true;
    else if (player.facing == Facing.down && player.row == gameBoard.length - 1) isBorder = true;

    else if (player.facing === Facing.right && (gameBoard[player.row][player.column + 1] === undefined || gameBoard[player.row][player.column + 1] === ' ')) isBorder = true;
    else if (player.facing === Facing.left && (gameBoard[player.row][player.column - 1] === undefined || gameBoard[player.row][player.column - 1] === ' ')) isBorder = true;
    else if (player.facing === Facing.up && (gameBoard[player.row - 1][player.column] === undefined || gameBoard[player.row - 1][player.column] === ' ')) isBorder = true;
    else if (player.facing === Facing.down && (gameBoard[player.row + 1][player.column] === undefined || gameBoard[player.row + 1][player.column] === ' ')) isBorder = true;

    return isBorder;
}

function isNextStepWalk(instructions: string[]): boolean {
    return /^\d+/.test(instructions[0]);
}

function findStart(data: string[]): number {
    return data[0].split('').findIndex(x => x === '.')
}

function getInstructions(data: string[]): string[] {
    const index = data.findIndex(x => x === '');
    return data[index + 1]
        .split(/(\d+)/)
        .filter(x => x !== '');
}

function buildGameBoard(data: string[]): string[][] {
    const arr: string[][] = [];
    data.pop();
    data.pop();

    data.forEach(item => arr.push(item.split('')));

    return arr;
}
