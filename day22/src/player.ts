import {Facing} from "./facing";

export class Player {
    private _facing: Facing;
    private _row: number;
    private _column: number;

    constructor(row: number, column: number, facing: Facing) {
        this._row = row;
        this._column = column;
        this._facing = facing;
    }

    get facing(): Facing {
        return this._facing;
    }

    set facing(value: Facing) {
        this._facing = value;
    }

    get row(): number {
        return this._row;
    }

    set row(value: number) {
        this._row = value;
    }

    get column(): number {
        return this._column;
    }

    set column(value: number) {
        this._column = value;
    }
}
