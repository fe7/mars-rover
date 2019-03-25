const chai = require('chai');
const should = chai.should();
const expect = chai.expect;
const assert = chai.assert;

const Rover = require('../Rover.js');
const Plateau = require('../Plateau.js');

describe('Rover', function() {

    const myPlateau = new Plateau(5 ,5);

    const roverinbounds = new Rover(1, 2, "N");
    const roverinboundsE = new Rover(1, 2, "E");
    const roverinbounds2 = new Rover(5, 5, "N");
    const roveroutbounds = new Rover(-1, 0, "E");
    const roveroutbounds2 = new Rover(1, 6, "E");

    // --------------------- rover properties  ---------------------

    const roverresult = new Rover(1, 2, "N");
    it('rover get result should be true', function() {
        roverresult.getX().should.equal(1);
        roverresult.getY().should.equal(2);
        roverresult.getDirection().should.equal("N");
        roverresult.giveResult().should.equal("1 2 N");

        roverresult.changeDirection("L");
        roverresult.giveResult().should.equal("1 2 W");
    })


    // --------------------- in bound landing ---------------------

    it('rover landed inbound should be true', function() {
        roverinbounds.checkInBoundsLanding(myPlateau.getX(),myPlateau.getY()).should.equal(true);
        roverinbounds2.checkInBoundsLanding(myPlateau.getX(),myPlateau.getY()).should.equal(true);
    })

    it('rover landed inbound should be false', function() {
        roveroutbounds.checkInBoundsLanding(myPlateau.getX(),myPlateau.getY()).should.equal(false);
        roveroutbounds2.checkInBoundsLanding(myPlateau.getX(),myPlateau.getY()).should.equal(false);
    })


    // --------------------- move in bounds  ---------------------
    
    it('rover will move within bounds should be true', function() {
        roverinbounds.willMoveWithinBounds(myPlateau.getX(),myPlateau.getY()).should.equal(true);
    })

    it('rover will move within bounds should be false', function() {
        roverinbounds2.willMoveWithinBounds(myPlateau.getX(),myPlateau.getY()).should.equal(false);
    })


    // --------------------- collision checks  ---------------------
    
    const rovercollide = new Rover(1, 3, "N");
    const rovernotcollide = new Rover(5, 5, "N");
    const rovercollide2 = new Rover(1, 3, "E");
    
    it('rover will collide should be true', function() {
        roverinbounds.willCollide(rovercollide.getX(),rovercollide.getY()).should.equal(true);
        roverinbounds.willCollide(rovercollide2.getX(),rovercollide2.getY()).should.equal(true);    
    })

    it('rover will collide should be false', function() {
        roverinbounds.willCollide(rovernotcollide.getX(),rovernotcollide.getY()).should.equal(false);
        roverinboundsE.willCollide(rovernotcollide.getX(),rovernotcollide.getY()).should.equal(false);
    })

    it('rover will collide should throw error', function() {
        assert.throws(() => roverinboundsE.willCollide("asdf", 0), Error, "TypeError - not valid coordinates");
    })

    // --------------------- change direction  ---------------------

    let roveranticlockwise = new Rover(1, 3, "N");
    let roverclockwise = new Rover(1, 3, "N");

    it('rover change direction should be true', function() {
        roveranticlockwise.changeDirection("L");
        roveranticlockwise.getDirection().should.equal("W");
        roveranticlockwise.changeDirection("L");
        roveranticlockwise.getDirection().should.equal("S");
        roveranticlockwise.changeDirection("L");
        roveranticlockwise.getDirection().should.equal("E");
        roveranticlockwise.changeDirection("L");
        roveranticlockwise.getDirection().should.equal("N");
        roveranticlockwise.changeDirection("A");
        roveranticlockwise.getDirection().should.equal("N");

        roverclockwise.changeDirection("R");
        roverclockwise.getDirection().should.equal("E");
        roverclockwise.changeDirection("R");
        roverclockwise.getDirection().should.equal("S");
        roverclockwise.changeDirection("R");
        roverclockwise.getDirection().should.equal("W");
        roverclockwise.changeDirection("R");
        roverclockwise.getDirection().should.equal("N");
        roverclockwise.changeDirection("Z");
        roverclockwise.getDirection().should.equal("N");
    })

    // --------------------- rove moves  --------------------------

    let roverfacingN = new Rover(1, 3, "N");
    let roverfacingE = new Rover(1, 3, "E");
    let roverfacingW = new Rover(1, 3, "W");
    let roverfacingS = new Rover(1, 3, "S");

    it('rover move should be true', function() {
        roverfacingN.justMove();
        roverfacingN.getY().should.equal(4);
        roverfacingN.getX().should.equal(1);
        roverfacingN.getDirection().should.equal("N");

        roverfacingE.justMove();
        roverfacingE.getY().should.equal(3);
        roverfacingE.getX().should.equal(2);
        roverfacingE.getDirection().should.equal("E");

        roverfacingW.justMove();
        roverfacingW.getY().should.equal(3);
        roverfacingW.getX().should.equal(0);
        roverfacingW.getDirection().should.equal("W");

        roverfacingS.justMove();
        roverfacingS.getY().should.equal(2);
        roverfacingS.getX().should.equal(1);
        roverfacingS.getDirection().should.equal("S");
    })

});

