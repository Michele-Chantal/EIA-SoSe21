"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    class Player extends Endaufgabe_Football_Simulation.Moveables {
        constructor(_position, _velocity, _color, _precision, _playerNo, _team) {
            super(_position, _velocity);
            this.perception = 110;
            this.color = _color;
            this.precision = _precision;
            this.playerNo = _playerNo;
            this.team = _team;
            this.startPosition = _position.copy();
            this.velocity = _velocity;
            this.position = _position;
        }
        //method to draw the players
        draw() {
            Endaufgabe_Football_Simulation.crc2.save();
            Endaufgabe_Football_Simulation.crc2.translate(this.position.x, this.position.y); //new position is set as start position for player
            //draw the players and style them
            Endaufgabe_Football_Simulation.crc2.fillStyle = this.color;
            Endaufgabe_Football_Simulation.crc2.strokeStyle = "white";
            Endaufgabe_Football_Simulation.crc2.lineWidth = 3;
            Endaufgabe_Football_Simulation.crc2.beginPath();
            Endaufgabe_Football_Simulation.crc2.arc(0, 0, 12, 0, 2 * Math.PI);
            Endaufgabe_Football_Simulation.crc2.stroke();
            Endaufgabe_Football_Simulation.crc2.fill();
            Endaufgabe_Football_Simulation.crc2.closePath();
            //restores the most recently saved canvas state
            Endaufgabe_Football_Simulation.crc2.restore();
            //resets the current transformation matrix of the crc2
            Endaufgabe_Football_Simulation.crc2.resetTransform();
        }
        //method to move the player
        move() {
            //sets the football (or rather the position of the football) as the players target
            this.target = Endaufgabe_Football_Simulation.football.position;
            //calculates the difference between the players position and the position of the ball and declares it as the variable 'direction'
            let direction = new Endaufgabe_Football_Simulation.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            //if the difference is larger than the perception radius the player returns to his starting position (or stays there if he hasn't moved before)
            if (direction.length > this.perception) {
                this.returnToStart();
                //if the difference is smaller than the perception radius the player moves to the ball
            }
            else {
                //adds the direction to the position
                direction.scale(this.velocity);
                this.position.add(direction);
                //when the player reaches the ball the game freezes and everything will stop moving
                // if ball has been reached by player, they are now in possession of it and the animation freezes. Also save this players precision value
                if (!Endaufgabe_Football_Simulation.ballIsMoving && !this.justPossessed && this.position.x - 17 < this.target.x && this.position.x + 17 > this.target.x && this.position.y - 17 < this.target.y && this.position.y + 17 > this.target.y) {
                    console.log("reached");
                    // find the player who last possessed the ball and make the status justPossessed false again
                    for (let player of Endaufgabe_Football_Simulation.players) {
                        if (player.justPossessed) {
                            player.justPossessed = false;
                        }
                    }
                    // the player who just reached the ball is now in possession of it and is also the player who last possessed it
                    this.inPossession = true;
                    this.justPossessed = true;
                    Endaufgabe_Football_Simulation.football.target = Endaufgabe_Football_Simulation.football.position;
                    Endaufgabe_Football_Simulation.freeze = true;
                    console.log("freeze");
                    Endaufgabe_Football_Simulation.currentPrecision = this.precision;
                }
            }
        }
        //players return to their starting position
        returnToStart() {
            this.target = this.startPosition;
            let direction = new Endaufgabe_Football_Simulation.Vector(this.target.x - this.position.x, this.target.y - this.position.y);
            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
        }
    }
    Endaufgabe_Football_Simulation.Player = Player;
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=player.js.map