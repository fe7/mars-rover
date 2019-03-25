const chai = require('chai');
const should = chai.should();
const expect = chai.expect;

const Plateau = require('../Plateau.js');


describe('Plateau', function() { 

    const myPlateau = new Plateau(4 ,5);
    it('plateau get coordinates should be true', function() {
        myPlateau.getX().should.equal(4);
        myPlateau.getY().should.equal(5);
    })

    const myPlateauX = new Plateau(4 ,5);
    const myPlateauY = new Plateau(4 ,5);

    it('plateau set coordinates should be true', function() {
        myPlateauX.setX(3);
        myPlateauX.getX().should.equal(3);
        myPlateauX.getY().should.equal(5);

        myPlateauY.setY(7);
        myPlateauY.getX().should.equal(4);
        myPlateauY.getY().should.equal(7);


        myPlateauY.setY(70000000);
        myPlateauY.getX().should.equal(4);
        myPlateauY.getY().should.equal(70000000);

       
    })

   
    it('plateau set coordinates should throw error', function() {
        expect(() => myPlateauY.setY("sdf")).to.throw(); 
        expect(() => myPlateauX.setY("sdf")).to.throw(); 
        expect(() => myPlateauY.setCoordinates("sdf", 0)).to.throw(); 
        expect(() => myPlateauY.setCoordinates(0, "s")).to.throw(); 
        expect(() => myPlateauY.setCoordinates(0, "--8")).to.throw(); 
    })


   
});

