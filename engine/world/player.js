export default class Player {
    constructor(x = 0, y = 0) {
        this.move(x, y)
    }

    move = (x = 0, y = 0) => {
        this.pos = {
            x,
            y
        }
    }

    equals = (o) => JSON.stringify(this) === JSON.stringify(o)
}