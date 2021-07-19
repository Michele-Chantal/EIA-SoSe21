"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    class Ball extends Endaufgabe_Football_Simulation.Moveables {
        constructor(_position, _velocity) {
            super(_position, _velocity);
            this.scoreTeam1 = 0;
            this.scoreTeam2 = 0;
            this.target = _position;
            this.startingPosition = _position;
        }
        draw() {
            Endaufgabe_Football_Simulation.crc2.save();
            Endaufgabe_Football_Simulation.crc2.translate(this.position.x, this.position.y); //new position is set as start position for ball
            //draw the ball
            Endaufgabe_Football_Simulation.crc2.beginPath();
            Endaufgabe_Football_Simulation.crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            Endaufgabe_Football_Simulation.crc2.stroke();
            Endaufgabe_Football_Simulation.crc2.fillStyle = "black";
            Endaufgabe_Football_Simulation.crc2.strokeStyle = "black";
            Endaufgabe_Football_Simulation.crc2.lineWidth = 3;
            Endaufgabe_Football_Simulation.crc2.fill();
            Endaufgabe_Football_Simulation.crc2.closePath();
            Endaufgabe_Football_Simulation.crc2.restore();
            Endaufgabe_Football_Simulation.crc2.resetTransform();
        }
        move() {
            //calculates the difference between the ball current position and the clicked position and declares it as the variable 'direction'
            let direction = new Endaufgabe_Football_Simulation.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
            //checks if the ball is out of play and if it is rolls it back into the field
            if (this.position.x < 0) {
                this.target.x += 100;
            }
            if (this.position.y < 0) {
                this.target.y += 100;
            }
            if (this.position.x > 1000) {
                this.target.x -= 100;
            }
            if (this.position.y > 600) {
                this.target.y -= 100;
            }
            //checks if the ball is in the goal of Team 1
            if (this.position.x <= 19 && this.position.y >= (Endaufgabe_Football_Simulation.canvas.height / 2) - 22 && this.position.y <= (Endaufgabe_Football_Simulation.canvas.height / 2) + 22) {
                //adds a point for team 2 if ball is in the goal
                this.scoreTeam2++;
                //finds the DOM-elements which display the score and changes those infos according to current score
                document.querySelector("#showScore").innerHTML = this.scoreTeam1 + ":" + this.scoreTeam2;
                //returns the ball to its starting position in the middle of the field
                this.position = new Endaufgabe_Football_Simulation.Vector(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2);
                this.target = new Endaufgabe_Football_Simulation.Vector(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2);
                //an alert pops up to notify the user that Team 2 scored a goal
                alert("Goal for Team 2!");
            }
            //checks if the ball is in the goal of Team 2
            if (this.position.x >= Endaufgabe_Football_Simulation.canvas.width - 19 && this.position.y >= (Endaufgabe_Football_Simulation.canvas.height / 2) - 22 && this.position.y <= (Endaufgabe_Football_Simulation.canvas.height / 2) + 22) {
                //adds a point for team 1 if ball is in the goal
                this.scoreTeam1++;
                //finds the DOM-elements which display the score and changes those infos according to current score
                document.querySelector("#showScore").innerHTML = this.scoreTeam1 + ":" + this.scoreTeam2;
                //returns the ball to its starting position in the middle of the field
                this.position = new Endaufgabe_Football_Simulation.Vector(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2);
                this.target = new Endaufgabe_Football_Simulation.Vector(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2);
                //an alert pops up to notify the user that Team 1 scored a goal
                alert("Goal for Team 1!");
            }
        }
    }
    Endaufgabe_Football_Simulation.Ball = Ball;
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=ball.js.map