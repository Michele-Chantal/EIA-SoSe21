namespace Endaufgabe_Football_Simulation {

    export class Vector {
        public x: number;
        public y: number;

        constructor(_x: number, _y: number) {
            this.set(_x, _y); //store the x and y values
        }

        public get length(): number {
            return Math.hypot(this.x, this.y);  //returns the square root of x and y for the length
        }

        //get the difference of two vectors
        public getDifference(_v0: Vector, _v1: Vector): Vector {
            return new Vector (_v0.x - _v1.x, _v0.y - _v1.y);
        }

        //überschreibt die x- und y-Werte von einem Vektor
        public set(_x: number, _y: number): void {
            this.x = _x;
            this.y = _y; 
        }

        public scale(_factor: number): void {
            this.x *= _factor; //x multiplied with the factor is the new x
            this.y *= _factor; //""
        }

        //addiert zum x- und y-Wert 
        public add(_addend: Vector): void {
            this.x += _addend.x;
            this.y += _addend.y; 
        }

        //
        copy(): Vector {
            return new Vector(this.x, this.y);
        }

    }

}