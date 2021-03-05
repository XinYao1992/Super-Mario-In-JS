export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callBack) {
        this.grid.forEach((columns, x) => {
            columns.forEach((value, y) => {
                callBack(value, x, y);
            });
        });
    }

    get(x, y) {
        const col = this.grid[x];
        if (col) {
            return col[y];
        }
        return undefined;
    }

    set(x, y, value) {// x is col, y is row, value is obj
        if (!this.grid[x]) {
            this.grid[x] = [];
        }
        this.grid[x][y] = value;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.set(x, y);
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}