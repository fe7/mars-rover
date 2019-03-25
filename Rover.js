class Rover {
    constructor (x, y, direction) {
        this.x = checkValidInt(x);
        this.y = checkValidInt(y);
        this.direction = direction;
    }

    checkInBoundsLanding (px, py) {
        // checks if landed in bounds of plateau px, py 
        if (this.x <= -1 || this.y <= -1 || (this.x > checkValidInt(px)) || (this.y > checkValidInt(py))) return false;
        return true;
    }

    justMove () {
        // get direction facing, edit x or y coordinates accordingly
        switch(this.direction) {
            case "N":
                this.y = this.y + 1;
                break;
            case "W":
                this.x = this.x - 1;
                break;
            case "S":
                this.y = this.y - 1;
                break;
            case "E":
                this.x = this.x + 1;
                break;
        }
    }

    willCollide(otherRoverXcoordinate, otherRoverYcoordinate) {
        // checks if moving the rover will collide with the rx, ry

        if (Number.isInteger(otherRoverXcoordinate) && Number.isInteger(otherRoverYcoordinate)) {
            switch(this.direction) {
                case "N":
                    if ((this.y + 1) == otherRoverYcoordinate && this.x == otherRoverXcoordinate){
                        return true;
                    } else {
                        return false;
                    }
                case "W":
                    if ((this.x - 1) == otherRoverXcoordinate && this.y == otherRoverYcoordinate){
                        return true;
                    } else {
                        return false;
                    }
                case "S":
                    if ((this.y - 1) == otherRoverYcoordinate && this.x == otherRoverXcoordinate){
                        return true;
                    } else {
                        return false;
                    }
                case "E":
                    if ((this.x + 1) == otherRoverXcoordinate && this.y == otherRoverYcoordinate){
                        return true;
                    } else {
                        return false;
                    }
        
                }
        
        } else {
            throw new Error("TypeError - not valid coordinates");
        }

        // if no collisons
        return false;
    }

    willMoveWithinBounds (plateauXcoordinate, plateauYcoordinate) {
        switch(this.direction) {
            case "N":
                if ((this.y + 1) <= plateauYcoordinate){
                    return true;
                } else {
                    return false;
                }
            case "W":
                if ((this.x - 1) >= 0){
                    return true;
                } else {
                    return false;
                }
            case "S":
                if ((this.y - 1) >= 0){
                    return true;
                } else {
                    return false;
                }
            case "E":
                if ((this.x + 1) <= plateauXcoordinate){
                    return true;
                } else {
                    return false;
                }
        }
    }

    getDirection () {
        return this.direction;
    }

    changeDirection (direction) {
        // Spec: rotates 90 degrees
        if (direction === "L") {
            switch(this.direction) {
                case "N":
                    this.direction = "W"
                    break;
                case "W":
                    this.direction = "S"
                    break;
                case "S":
                    this.direction = "E"
                    break;
                case "E":
                    this.direction = "N"
                    break;
            }
            
        } else if (direction === "R") {
            switch(this.direction) {
                case "N":
                    this.direction = "E"
                    break;
                case "E":
                    this.direction = "S"
                    break;
                case "S":
                    this.direction = "W"
                    break;
                case "W":
                    this.direction = "N"
                    break;
            }
            
        } 
    }

    giveResult() {
        return this.x + " " + this.y + " " + this.direction;
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }
}

const checkValidInt = (input) => {
    let toreturn = parseInt(input);
    if (Number.isInteger(toreturn)) {
        return toreturn;
    } else {
        throw new Error("TypeError - not valid integer input");
    }
}

module.exports = Rover;