namespace Endaufgabe_Football_Simulation {

    export class Ball extends Moveables {

        public startingPosition: Vector;
        public target: Vector;
        private scoreTeam1: number = 0;
        private scoreTeam2: number = 0;

        constructor(_position: Vector, _velocity: number) {
            super(_position, _velocity);
            this.target = _position;
            this.startingPosition = _position;
        }

        public draw(): void {

            crc2.save();
            crc2.translate(this.position.x, this.position.y); //new position is set as start position for ball
        
            //draw the ball
            crc2.beginPath();
            crc2.arc(0, 0, 10, 0, 2 * Math.PI);
            crc2.stroke();
            crc2.fillStyle = "black";
            crc2.strokeStyle = "black";
            crc2.lineWidth = 3;
            crc2.fill();
            crc2.closePath();

            crc2.restore();
            crc2.resetTransform();
        }

        public move(): void {
            //calculates the difference between the ball current position and the clicked position and declares it as the variable 'direction'
            let direction: Vector = new Vector(this.target.x - this.position.x, this.target.y - this.position.y);

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
            if (this.position.x <= 19 && this.position.y >= (canvas.height / 2) - 22 && this.position.y <= (canvas.height / 2) + 22) {
                //adds a point for team 2 if ball is in the goal
                this.scoreTeam2++;
                //finds the DOM-elements which display the score and changes those infos according to current score
                (<HTMLElement>document.querySelector("#showScore")).innerHTML = this.scoreTeam1 + ":" + this.scoreTeam2;
                //returns the ball to its starting position in the middle of the field
                this.position = new Vector(canvas.width / 2, canvas.height / 2);
                this.target = new Vector(canvas.width / 2, canvas.height / 2);
                //an alert pops up to notify the user that Team 2 scored a goal
                alert("Goal for Team 2!");
            }

            //checks if the ball is in the goal of Team 2
            if (this.position.x >= canvas.width - 19 && this.position.y >= (canvas.height / 2) - 22 && this.position.y <= (canvas.height / 2) + 22) {
                //adds a point for team 1 if ball is in the goal
                this.scoreTeam1++;
                //finds the DOM-elements which display the score and changes those infos according to current score
                (<HTMLElement>document.querySelector("#showScore")).innerHTML = this.scoreTeam1 + ":" + this.scoreTeam2;
                //returns the ball to its starting position in the middle of the field
                this.position = new Vector(canvas.width / 2, canvas.height / 2);
                this.target = new Vector(canvas.width / 2, canvas.height / 2);
                //an alert pops up to notify the user that Team 1 scored a goal
                alert("Goal for Team 1!");
            }
        }

    }

}