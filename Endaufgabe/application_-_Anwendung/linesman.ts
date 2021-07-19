namespace Endaufgabe_Football_Simulation {

    export class Linesman extends Moveables {

        public color: string;
        private target: Vector;

        constructor(_position: Vector, _velocity: number, _color: string) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }

        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y); //new position is set as start position for ball
        
            //draw and style the linesmans
            crc2.beginPath();
            crc2.arc(0, 0, 12, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.fillStyle = "yellow";
            crc2.fill();
            crc2.closePath();

            //stripes on the shirt
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.fillRect(-1.5, -12, 2, 24);
            crc2.closePath();

            crc2.restore();
            crc2.resetTransform();
        }

        public move(): void {
            //sets the football (or rather the position of the football) as the linesmans target (but they will only move in the horizontal direction)
            this.target = football.position ;
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.target.y);
        
            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
        }

    }

}