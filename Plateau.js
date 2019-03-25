class Plateau {
    constructor(x, y){
        this.px = checkValidInt(x);
        this.py = checkValidInt(y);
    }

    setCoordinates (x,y) {
        this.px = checkValidInt(x);
        this.py = checkValidInt(y);
    }

    setX (x) {
        this.px = checkValidInt(x);
    }

    setY (y) {
        this.py = checkValidInt(y);
    }

    getX() {
        return this.px
    }

    getY() {
        return this.py
    }
}

const checkValidInt = (input) => {
    let toreturn = parseInt(input);
    if (Number.isInteger(toreturn)) {
        return toreturn;
    } else {
        throw Error("Plateau - not valid integer input");
    }
}

module.exports = Plateau;