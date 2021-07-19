"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    class Linesman extends Endaufgabe_Football_Simulation.Moveables {
        constructor(_position, _velocity, _color) {
            super(_position, _velocity);
            this.position = _position;
            this.velocity = _velocity;
        }
        draw() {
            Endaufgabe_Football_Simulation.crc2.save();
            Endaufgabe_Football_Simulation.crc2.translate(this.position.x, this.position.y); //new position is set as start position for ball
            //draw and style the linesmans
            Endaufgabe_Football_Simulation.crc2.beginPath();
            Endaufgabe_Football_Simulation.crc2.arc(0, 0, 12, 0, 2 * Math.PI);
            Endaufgabe_Football_Simulation.crc2.strokeStyle = "black";
            Endaufgabe_Football_Simulation.crc2.lineWidth = 3;
            Endaufgabe_Football_Simulation.crc2.stroke();
            Endaufgabe_Football_Simulation.crc2.fillStyle = "yellow";
            Endaufgabe_Football_Simulation.crc2.fill();
            Endaufgabe_Football_Simulation.crc2.closePath();
            //stripes on the shirt
            Endaufgabe_Football_Simulation.crc2.beginPath();
            Endaufgabe_Football_Simulation.crc2.fillStyle = "black";
            Endaufgabe_Football_Simulation.crc2.fillRect(-1.5, -12, 2, 24);
            Endaufgabe_Football_Simulation.crc2.closePath();
            Endaufgabe_Football_Simulation.crc2.restore();
            Endaufgabe_Football_Simulation.crc2.resetTransform();
        }
        move() {
            //sets the football (or rather the position of the football) as the linesmans target (but they will only move in the horizontal direction)
            this.target = Endaufgabe_Football_Simulation.football.position;
            let direction = new Endaufgabe_Football_Simulation.Vector(this.target.x - this.position.x, this.target.y - this.target.y);
            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
    Endaufgabe_Football_Simulation.Linesman = Linesman;
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=linesman.js.map