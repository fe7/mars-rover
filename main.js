// ----------------------------------  Classes ------------------------------------- 

const Plateau = require('./Plateau.js');
const Rover = require('./Rover.js');

// ----------------------------------  Functions ---------------------------------- 

const GetInputArray = () => {
    let fs = require("fs");
    let inputFile = fs.readFileSync("./input.txt", "utf-8");
    return inputFile.split("\n")
}

const parsePlateauX = (inputByLine) => {

    let input = inputByLine[0].trim().split(' ');
    let toreturnX = parseInt(input[0]);
    if (Number.isInteger(toreturnX)) {
        return toreturnX;
    } else {
        throw "plateau x coordinate not integer";
    }
    
}

const parsePlateauY = (inputByLine) => {
    let input = inputByLine[0].trim().split(' ');
    let toreturnY = parseInt(input[1]);
    if (Number.isInteger(toreturnY)) {
        return toreturnY;
    } else {
        throw "plateau y coordinate not integer";
    }
}

const ValidFacing = (direction) => {
    switch(direction) {
        case "N":
            return true;
        case "W":
            return true;
        case "S":
            return true;
        case "E":
            return true;
        default:
            return false;
    }
}

const InitialiseRoverDetails = (inputByLine) => {
    let roverCoordinatesinputLine = true, input = '';
    let rover_array_object = [];
    let rover_list = [];

    // reading input from from input.txt file and saving into rover_list
    for (let line = 1; line < inputByLine.length; line++) {
        if (roverCoordinatesinputLine) {
            input = inputByLine[line].trim().split(' ');
            let roverx = parseInt(input[0]);
            let rovery = parseInt(input[1]);
            let roverfacing = input[2];

            if (!Number.isInteger(roverx) || !Number.isInteger(rovery) || !ValidFacing(roverfacing)) {
                throw "rover details incorrect";
            }

            let rover = new Rover(roverx, rovery, roverfacing);
            rover_array_object.push(rover);
            roverCoordinatesinputLine = false;

        } else {
            // rover movement instructions line
            input = inputByLine[line].trim().split(' ');
            rover_array_object.push(input[0]);

            // save rover coordinates and instructions
            rover_list.push(rover_array_object);

            // reset
            rover_array_object = [];
            roverCoordinatesinputLine = true;

        }
    }

    return rover_list;
}

const ProcessRovers = (rover_array, myPlateau) => {
    // go through rover list
    for (rprocessing in rover_array) {

        let instructions = rover_array[rprocessing][1];
        let mrover = rover_array[rprocessing][0];
        if (mrover.checkInBoundsLanding(myPlateau.getX(), myPlateau.getY())) {
    
            let rprocessing_willCollide = false;
            for (let i = 0; i < instructions.length; i++) {
                if ((instructions.charAt(i) === "M") && mrover.willMoveWithinBounds(myPlateau.px, myPlateau.py)){
                    
                    // check collision before moving
                    for (rpointer in rover_array) {

                        if (rpointer !== rprocessing) {
                            let roverToCheck = rover_array[rpointer][0];
                            if (mrover.willCollide(roverToCheck.getX(), roverToCheck.getY())){
                                rprocessing_willCollide = true;
                                break; // break: collision check loop
                            } else {
                                rprocessing_willCollide = false
                            }
                        }
                    }

                    if (rprocessing_willCollide) {
                        break; // break: instructions loop
                    } else {
                        mrover.justMove(); 
                    }

                } else {
                    mrover.changeDirection(instructions.charAt(i));
                }
            }

            // update rover's coordinates in the array of all rovers
            rover_array[rprocessing][0] = mrover;
        } 
        // print rover
        console.log(mrover.giveResult());
    }
}

// ----------------------------------  Running it --------------------------------- 

const RunInOrder = async () => {

    try {
        
        let inputByLine = GetInputArray();
        const myPlateau = new Plateau(parsePlateauX(inputByLine), parsePlateauY(inputByLine));
        const RoverListInput = InitialiseRoverDetails(inputByLine);
        ProcessRovers(RoverListInput, myPlateau);

    } catch(e) {
        console.log('Error: ' + e);
    }
   
}

RunInOrder()