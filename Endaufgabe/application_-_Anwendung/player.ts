namespace Endaufgabe_Football_Simulation {

    export class Player extends Moveables {

        public playerNo: number;
        public team: string;
        public precision: number;
        inPossession: boolean;
        justPossessed: boolean;
        private color: string;
        private perception: number = 110;
        private target: Vector;
        private startPosition: Vector;
        

        //
        constructor(_position: Vector, _velocity: number, _color: string, _precision: number, _playerNo: number, _team: string) {
            super(_position, _velocity);
            this.color = _color;
            this.precision = _precision;
            this.playerNo = _playerNo;
            this.team = _team;
            this.startPosition = _position.copy();
            this.velocity = _velocity;
            this.position = _position;
        }

        //method to draw the players
        public draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y); //new position is set as start position for player
        
            //draw the players and style them
            crc2.fillStyle = this.color;
            crc2.strokeStyle = "white";
            crc2.lineWidth = 3;
            crc2.beginPath();
            crc2.arc(0, 0, 12, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fill();
            crc2.closePath();

            //restores the most recently saved canvas state
            crc2.restore();
            //resets the current transformation matrix of the crc2
            crc2.resetTransform();
        }

        //method to move the player
        public move(): void {
            //sets the football (or rather the position of the football) as the players target
            this.target = football.position;
            //calculates the difference between the players position and the position of the ball and declares it as the variable 'direction'
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

            //if the difference is larger than the perception radius the player returns to his starting position (or stays there if he hasn't moved before)
            if (direction.length > this.perception) {
                this.returnToStart();
            //if the difference is smaller than the perception radius the player moves to the ball
            } else {
                //adds the direction to the position
                direction.scale(this.velocity);
                this.position.add(direction);

                //when the player reaches the ball the game freezes and everything will stop moving
                // if ball has been reached by player, they are now in possession of it and the animation freezes. Also save this players precision value
                if (!ballIsMoving && !this.justPossessed && this.position.x - 17 < this.target.x && this.position.x + 17 > this.target.x && this.position.y - 17 < this.target.y && this.position.y + 17 > this.target.y) {
                    console.log("reached");
                    // find the player who last possessed the ball and make the status justPossessed false again
                    for (let player of players) {
                        if (player.justPossessed) {
                            player.justPossessed = false;
                        }
                    }
                    // the player who just reached the ball is now in possession of it and is also the player who last possessed it
                    this.inPossession = true;
                    this.justPossessed = true;
                    football.target = football.position;
                    freeze = true;
                    console.log("freeze");
                    currentPrecision = this.precision;
                }
            }
        }

        //players return to their starting position
        returnToStart(): void {
            this.target = this.startPosition;
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

            //adds the direction to the position
            direction.scale(this.velocity);
            this.position.add(direction);
        }

    }

}