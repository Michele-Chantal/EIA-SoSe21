namespace Endaufgabe_Football_Simulation {

    export class Referee extends Moveables {

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
        
            //draw and style the referee
            crc2.beginPath();
            crc2.arc(0, 0, 12, 0, 2 * Math.PI);
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.stroke();
            crc2.fillStyle = "white";
            crc2.fill();
            crc2.closePath();

            //stripes on the shirt
            crc2.beginPath();
            crc2.fillStyle = "black";
            crc2.fillRect(-10, -9, 2, 19);
            crc2.fillRect(-6, -12, 2, 24);
            crc2.fillRect(-1.5, -12, 2, 25);
            crc2.fillRect(3, -12, 2, 24);
            crc2.fillRect(7, -9, 2, 19);
            crc2.closePath();

            crc2.restore();
            crc2.resetTransform();
        }

        public move(): void {
            //sets the football (or rather the position of the football) as the referees target (but he stops a bit away from the ball)
            this.target = new Vector(football.position.x - 0, football.position.y - 80);
            //calculates the difference between the referees position and the position of the ball and declares it as the variable 'direction'
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);
        
            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
        }

    }

}