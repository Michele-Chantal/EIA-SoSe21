"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y); //store the x and y values
        }
        get length() {
            return Math.hypot(this.x, this.y); //returns the square root of x and y for the length
        }
        //get the difference of two vectors
        getDifference(_v0, _v1) {
            return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
        }
        //überschreibt die x- und y-Werte von einem Vektor
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor; //x multiplied with the factor is the new x
            this.y *= _factor; //""
        }
        //addiert zum x- und y-Wert 
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
        //
        copy() {
            return new Vector(this.x, this.y);
        }
    }
    Endaufgabe_Football_Simulation.Vector = Vector;
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=vector.js.map