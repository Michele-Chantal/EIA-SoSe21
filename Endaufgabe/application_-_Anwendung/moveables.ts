namespace Endaufgabe_Football_Simulation {

    export abstract class Moveables { //abstract because it has subclasses

        public position: Vector;
        public velocity: number;

        constructor(_position: Vector, _velocity: number) {
            this.position = _position;
            this.velocity = _velocity;
        }

        public abstract draw(): void; //empty, because it's different in each subclass

        public abstract move(): void; //""

    }



}