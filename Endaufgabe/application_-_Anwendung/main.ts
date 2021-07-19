namespace Endaufgabe_Football_Simulation {
    window.addEventListener("load", handleLoad);

    //declaration of some variables; export so the other classes can access them
    export let canvas: HTMLCanvasElement;
    export let crc2: CanvasRenderingContext2D;
    export let football: Ball;
    export let freeze: boolean = false;
    export let ballIsMoving: boolean;
    export let currentPlayer: Player;
    export let selectedPlayer: Player;
    export let currentPrecision: number;
    export let imageData: ImageData;
    export let players: Player[] = [];

    let firstPage: boolean = true;                   //boolean to see if user is on the first page -> for the keydown event
    let btnStart: HTMLButtonElement;
    let btnSwitch: HTMLButtonElement;
    let formData: FormData;
    let moveables: Moveables[] = [];
    let team1Players: Player[] = [];
    let team2Players: Player[] = [];
    let timesSwitched1: number = 1;
    let timesSwitched2: number = 1;

    //declaration of variables for Team 1
    let shirtColor1: string;                        //declare it as a variable with the type string
    let minVelocity1: number;
    let maxVelocity1: number;
    let minPrecision1: number;
    let maxPrecision1: number;

    //declaration of variables for Team 2
    let shirtColor2: string;
    let minVelocity2: number;
    let maxVelocity2: number;
    let minPrecision2: number;
    let maxPrecision2: number;

    //declaration of variables for the referees
    let refColor: string;
    let linesmanColor: string;

    //install click listener on btnStart and btnSwitch
    function handleLoad(_event: Event): void {
        btnStart = <HTMLButtonElement>document.querySelector("#btnStart");
        btnStart.addEventListener("click", handleStart);

        btnSwitch = <HTMLButtonElement>document.querySelector("#btnSwitch");
        btnSwitch.addEventListener("click", switchPlayer);

        //add keydown event listener
        window.addEventListener("keydown", keyPressed);
    }

    //function to see if 'Enter' key is pressed
    function keyPressed(_event: KeyboardEvent): void {
        if (_event.key == "Enter" && firstPage == true) {         //if the 'Enter' key is pressed and the user is on the first page it will call handleStart
            firstPage = false;                                    //firstPage turns false so it can't call handleStart again with the enter key
            handleStart();
        }
    }

    function handleStart(): void {
        //declares the variables and assigns them a querySelector
        let team1: HTMLDivElement = <HTMLDivElement>document.querySelector("#team1");
        let team2: HTMLDivElement = <HTMLDivElement>document.querySelector("#team2");
        let canvasBox: HTMLDivElement = <HTMLDivElement>document.querySelector("#canvasContainer");
        let text: HTMLParagraphElement = <HTMLParagraphElement>document.getElementById("text");
        let score: HTMLDivElement = <HTMLDivElement>document.querySelector("#score");
        let playerInfo: HTMLDivElement = <HTMLDivElement>document.querySelector("#playerInfo");
        let infos: HTMLDivElement = <HTMLDivElement>document.querySelector("#infos");

        //changes the display style to 'none' so it will be hidden after clicking the start button
        team1.style.display = "none";
        team2.style.display = "none";
        btnStart.style.display = "none";
        infos.style.display = "none";
        text.style.display = "none";

        //assigns the canvas and the crc2, and determines the width and height of the canvas
        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        canvas.width = 1000;
        canvas.height = 600;

        //changes the display style so the canvas etc. will be shown after clicking the start button -> were hidden before
        canvasBox.style.display = "flex";
        canvas.style.display = "initial";
        score.style.display = "initial";
        playerInfo.style.display = "initial";

        canvas.addEventListener("click", getPlayerInfo);
        canvas.addEventListener("dblclick", shootBall);

        handleForm();
    }

    // function to save the data that was chosen on the form and give it back for further use (for the players)
    function handleForm(): void {
        formData = new FormData(document.forms[0]);

        //assigns the variables from team 1 a querySelector
        shirtColor1 = <string>formData.get("shirtColor1")?.toString();  //get the shirt colour and return it as a string object // <string>, so the programm knows it's a string
        minVelocity1 = Number(formData.get("minVelocity1"));            //Type of the formular so it can compare it to the type of the variable and see if it fits
        maxVelocity1 = Number(formData.get("maxVelocity1"));
        minPrecision1 = Number(formData.get("minPrecision1"));
        maxPrecision1 = Number(formData.get("maxPrecision1"));

        //assigns the variables from team 2 a querySelector
        shirtColor2 = <string>formData.get("shirtColor2")?.toString();
        minVelocity2 = Number(formData.get("minVelocity2"));
        maxVelocity2 = Number(formData.get("maxVelocity2"));
        minPrecision2 = Number(formData.get("minPrecision2"));
        maxPrecision2 = Number(formData.get("maxPrecision2"));

        drawField();
        setUpGame();
        update();
    }

    function setUpGame(): void {
        //declare a variable for positions and assign a Vector-Array for all the available positions on the field for the player, each team gets different positions
        let pos1: Vector[] = [new Vector(55, 300), new Vector(280, 101), new Vector(125, 250), new Vector(481, 80), new Vector(62, 512), new Vector(335, 337), new Vector(440, 250), new Vector(880, 520), new Vector(600, 512), new Vector(840, 290), new Vector(875, 150)];
        let pos2: Vector[] = [new Vector(950, 300), new Vector(720, 435), new Vector(430, 530), new Vector(180, 380), new Vector(800, 40), new Vector(730, 270), new Vector(560, 350), new Vector(650, 150), new Vector(250, 206), new Vector(250, 512), new Vector(100, 90)];
        let linesPos: Vector[] = [new Vector(140, 593), new Vector(812, 7)];            //starting positions are on the upper and lower lines, one to the right and the other to the left
        let refPos: Vector = (new Vector(575, 250));                //starting Position for the referee is set near the middle (because that is where the ball is in the beginning)

        //declare a variable for the player numbers and assign them an Array with number 1-11 (for both teams)
        let playerNo: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

        //a for-loop to assign player 1-11 from team 1 all the stats (like position, velocity, shirt color etc.); loop runs for 11 players then it stops
        for (let i: number = 0; i < 11; i++) {
            //velocity and precision is generated for each player according to the user's chosen min and max values for team 1 (values in between)
            let playerVelocity: number = randomNo(minVelocity1, maxVelocity1);
            let playerPrecision: number = randomNo(minPrecision1, maxPrecision1);
            //a variable for the player is created with the chosen and randomised stats
            let player: Player = new Player(pos1[i], playerVelocity, shirtColor1, playerPrecision, playerNo[i], "1");
            //then the player gets drawn and pushed into the moveable and player array
            player.draw();
            moveables.push(player);
            players.push(player);
            team1Players.push(player);
        }

        //a for-loop to assign player 1-11 from team 2 all the stats (like position, velocity, shirt color etc.); loop runs for 11 players then it stops
        for (let i: number = 0; i < 11; i++) {
            //velocity and precision is generated for each player according to the user's chosen min and max values for team 1 (values in between)
            let playerVelocity: number = randomNo(minVelocity2, maxVelocity2);
            let playerPrecision: number = randomNo(minPrecision2, maxPrecision2);
            //a variable for the player is created with the chosen and randomised stats
            let player: Player = new Player(pos2[i], playerVelocity, shirtColor2, playerPrecision, playerNo[i], "2");
            //then the player gets drawn and pushed into the moveable and player array
            player.draw();
            moveables.push(player);
            players.push(player);
            team2Players.push(player);
        }

        for (let i: number = 0; i < 2; i++) {
            //set the velocity of the referee to a random number, I choose 50 because it's the middle of the possible velocity
            let linesVelocity: number = 0.01;
            //declare the referee variable and the starting position and velocity is assigned
            let linesman: Linesman = new Linesman(linesPos[i], linesVelocity, linesmanColor);
            //draw the referee and push them into the moveable array
            linesman.draw();
            moveables.push(linesman);
        }

        //set the velocity of the referee to a random number, I choose 50 because it's the middle of the possible velocity
        let refVelocity: number = 0.01;
        //declare the referee variable and the starting position and velocity is assigned
        let referee: Referee = new Referee(refPos, refVelocity, refColor);
        //draw the referee and push them into the moveable array
        referee.draw();
        moveables.push(referee);

        //draw the ball and place it in the middle of the field
        football = new Ball(new Vector(canvas.width / 2, canvas.height / 2), 0.015);
        football.draw();
        moveables.push(football);
    }

    //animates the canvas
    function update(): void {
        //requests that the browser updates the animation
        requestAnimationFrame(update);
        //erases the previously drawn canvas
        crc2.clearRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        //paints the data from the given ImageData onto the canvas
        crc2.putImageData(imageData, 0, 0);

        //determines if the game is frozen, if not the moveables are drawn and can still move
        if (!freeze) {
            for (let moveable of moveables) {
                moveable.move();
                moveable.draw();
            }
        //if it is, the moveables get drawn but they can't move until the game continues
        } else {
            for (let moveable of moveables) {
                moveable.draw();
            }
            football.move();
            football.draw();
        }
        showBallPossession();
    }

    //get the info about the player you click on
    function getPlayerInfo(_event: MouseEvent): void {
        //return the DOMRect object and get information about the size of the canvas and it's relative position on the viewport
        let rect: DOMRect = canvas.getBoundingClientRect();
        //subtract the rect from the clicked x- and y-position to get the accurate coordinates
        let x: number = _event.clientX - rect.left;
        let y: number = _event.clientY - rect.top;
        let mousePosition: Vector = new Vector(x, y);

        for (let player of players) {
            //if the user clicks on a player the function to show the players info is called
            if (player.position.x - 10 < mousePosition.x && player.position.x + 10 > mousePosition.x && player.position.y - 10 < mousePosition.y && player.position.y + 10 > mousePosition.y) {
                selectedPlayer = player;
                showPlayerInfo();
            }
        }
    }

    //switch a player with another one with a different number and stats
    function switchPlayer(_event: MouseEvent): void {
        if (selectedPlayer.team == "1") {                                            //checks to see if the chosen player is from team 1
            selectedPlayer.velocity = randomNo(minVelocity1, maxVelocity1);          //gives the player a new velocity and precision
            selectedPlayer.precision = randomNo(minPrecision1, maxPrecision1);
            selectedPlayer.playerNo = team1Players.length + timesSwitched1;          //adds 1 to the player number length of team 1 -> new player number
            timesSwitched1++;
        } else {                                                                    //if the player is from team two this else-function will be called
            selectedPlayer.playerNo = team2Players.length + timesSwitched2;          //adds 1 to the player number length of team 2 -> new player number
            selectedPlayer.velocity = randomNo(minVelocity2, maxVelocity2);
            selectedPlayer.precision = randomNo(minPrecision2, maxPrecision2);
            timesSwitched2++;
        }
        showPlayerInfo();
    }

    //finds the DOM-elements which display the players info and changes those infos according to the player that was selected
    function showPlayerInfo(): void {
        (<HTMLElement>document.querySelector("#infoTeam")).innerHTML = "Team: " + selectedPlayer.team;
        (<HTMLElement>document.querySelector("#infoNumber")).innerHTML = "Number: " + selectedPlayer.playerNo;
        (<HTMLElement>document.querySelector("#infoVelocity")).innerHTML = "Velocity: " + selectedPlayer.velocity;
        (<HTMLElement>document.querySelector("#infoPrecision")).innerHTML = "Precision: " + selectedPlayer.precision;
    }

    //makes it able for the user to shoot the ball, if a player is in possession of it
    function shootBall (_event: MouseEvent): void {
        //if a player is in possession of the ball and the game is frozen it will unfreeze the game, so the user can shoot the ball
        if (freeze && ballPossessed) {
            freeze = false;
            for (let player of players) {
                if (player.inPossession) {
                    player.inPossession = false;
                    //
                    let rect: DOMRect = canvas.getBoundingClientRect();
                    //the user can click somewhere on the field and the position where the ball should roll to gets calculated
                    let mousePosition: Vector = new Vector(_event.clientX - rect.left, _event.clientY - rect.top);
                    //declare the variable direction that gets the distance between the clicked position and the ball
                    let direction: Vector = new Vector(mousePosition.x - football.position.x, mousePosition.y - football.position.y);

                    //the currentPrecision value will change depending on the distance between clicked position and the ball
                    //if the distance is greater than 500 the currentPrecision will increase by 20
                    if (direction.length > 500) {
                        currentPrecision += 20;
                        console.log("worst case scenario");
                    //if the distance is greater than 250 the currentPrecision will increase by 10
                    } else if (direction.length > 170) {
                        currentPrecision += 10;
                        console.log("medium case scenario");
                    //if the distance is smaller than 250 the currentPrecision will increase by 5
                    } else {
                        currentPrecision += 1;
                        console.log("best case scenario");
                    }
                   
                    //the new calculated position will be set as the new football position
                    let newTarget: Vector = new Vector(mousePosition.x - currentPrecision, mousePosition.y - currentPrecision);
                    football.target = newTarget;
                }
            }
        }
    }

    //checks if the ball is currently in possession
    function ballPossessed(): boolean {
        let ballPossessed: boolean = false;
        for (let player of players) {
            if (player.inPossession) {
                ballPossessed = true;
            }
        }
        return ballPossessed;
    }

    //shows who is currently in possession of the ball
    function showBallPossession(): void {
        for (let player of players) {
            if (player.inPossession) {
                currentPlayer = player;
                //finds the DOM-elements which display the player in possession of the ball and changes those infos accordingly
                (<HTMLElement>document.querySelector("#inPossession")).innerHTML = "Player " + currentPlayer.playerNo + " of Team " + currentPlayer.team;
            }
        }
    }

    //return a random number between the min and max velocity and precision that was chosen on the form
    function randomNo(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }

}