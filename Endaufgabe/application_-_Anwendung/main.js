"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    window.addEventListener("load", handleLoad);
    Endaufgabe_Football_Simulation.freeze = false;
    Endaufgabe_Football_Simulation.players = [];
    let firstPage = true; //boolean to see if user is on the first page -> for the keydown event
    let btnStart;
    let btnSwitch;
    let formData;
    let moveables = [];
    let team1Players = [];
    let team2Players = [];
    let timesSwitched1 = 1;
    let timesSwitched2 = 1;
    //declaration of variables for Team 1
    let shirtColor1; //declare it as a variable with the type string
    let minVelocity1;
    let maxVelocity1;
    let minPrecision1;
    let maxPrecision1;
    //declaration of variables for Team 2
    let shirtColor2;
    let minVelocity2;
    let maxVelocity2;
    let minPrecision2;
    let maxPrecision2;
    //declaration of variables for the referees
    let refColor;
    let linesmanColor;
    //install click listener on btnStart and btnSwitch
    function handleLoad(_event) {
        btnStart = document.querySelector("#btnStart");
        btnStart.addEventListener("click", handleStart);
        btnSwitch = document.querySelector("#btnSwitch");
        btnSwitch.addEventListener("click", switchPlayer);
        //add keydown event listener
        window.addEventListener("keydown", keyPressed);
    }
    //function to see if 'Enter' key is pressed
    function keyPressed(_event) {
        if (_event.key == "Enter" && firstPage == true) { //if the 'Enter' key is pressed and the user is on the first page it will call handleStart
            firstPage = false; //firstPage turns false so it can't call handleStart again with the enter key
            handleStart();
        }
    }
    function handleStart() {
        //declares the variables and assigns them a querySelector
        let team1 = document.querySelector("#team1");
        let team2 = document.querySelector("#team2");
        let canvasBox = document.querySelector("#canvasContainer");
        let text = document.getElementById("text");
        let score = document.querySelector("#score");
        let playerInfo = document.querySelector("#playerInfo");
        let infos = document.querySelector("#infos");
        //changes the display style to 'none' so it will be hidden after clicking the start button
        team1.style.display = "none";
        team2.style.display = "none";
        btnStart.style.display = "none";
        infos.style.display = "none";
        text.style.display = "none";
        //assigns the canvas and the crc2, and determines the width and height of the canvas
        Endaufgabe_Football_Simulation.canvas = document.querySelector("canvas");
        Endaufgabe_Football_Simulation.crc2 = Endaufgabe_Football_Simulation.canvas.getContext("2d");
        Endaufgabe_Football_Simulation.canvas.width = 1000;
        Endaufgabe_Football_Simulation.canvas.height = 600;
        //changes the display style so the canvas etc. will be shown after clicking the start button -> were hidden before
        canvasBox.style.display = "flex";
        Endaufgabe_Football_Simulation.canvas.style.display = "initial";
        score.style.display = "initial";
        playerInfo.style.display = "initial";
        Endaufgabe_Football_Simulation.canvas.addEventListener("click", getPlayerInfo);
        Endaufgabe_Football_Simulation.canvas.addEventListener("dblclick", shootBall);
        handleForm();
    }
    // function to save the data that was chosen on the form and give it back for further use (for the players)
    function handleForm() {
        formData = new FormData(document.forms[0]);
        //assigns the variables from team 1 a querySelector
        shirtColor1 = formData.get("shirtColor1")?.toString(); //get the shirt colour and return it as a string object // <string>, so the programm knows it's a string
        minVelocity1 = Number(formData.get("minVelocity1")); //Type of the formular so it can compare it to the type of the variable and see if it fits
        maxVelocity1 = Number(formData.get("maxVelocity1"));
        minPrecision1 = Number(formData.get("minPrecision1"));
        maxPrecision1 = Number(formData.get("maxPrecision1"));
        //assigns the variables from team 2 a querySelector
        shirtColor2 = formData.get("shirtColor2")?.toString();
        minVelocity2 = Number(formData.get("minVelocity2"));
        maxVelocity2 = Number(formData.get("maxVelocity2"));
        minPrecision2 = Number(formData.get("minPrecision2"));
        maxPrecision2 = Number(formData.get("maxPrecision2"));
        Endaufgabe_Football_Simulation.drawField();
        setUpGame();
        update();
    }
    function setUpGame() {
        //declare a variable for positions and assign a Vector-Array for all the available positions on the field for the player, each team gets different positions
        let pos1 = [new Endaufgabe_Football_Simulation.Vector(55, 300), new Endaufgabe_Football_Simulation.Vector(280, 101), new Endaufgabe_Football_Simulation.Vector(125, 250), new Endaufgabe_Football_Simulation.Vector(481, 80), new Endaufgabe_Football_Simulation.Vector(62, 512), new Endaufgabe_Football_Simulation.Vector(335, 337), new Endaufgabe_Football_Simulation.Vector(440, 250), new Endaufgabe_Football_Simulation.Vector(880, 520), new Endaufgabe_Football_Simulation.Vector(600, 512), new Endaufgabe_Football_Simulation.Vector(840, 290), new Endaufgabe_Football_Simulation.Vector(875, 150)];
        let pos2 = [new Endaufgabe_Football_Simulation.Vector(950, 300), new Endaufgabe_Football_Simulation.Vector(720, 435), new Endaufgabe_Football_Simulation.Vector(430, 530), new Endaufgabe_Football_Simulation.Vector(180, 380), new Endaufgabe_Football_Simulation.Vector(800, 40), new Endaufgabe_Football_Simulation.Vector(730, 270), new Endaufgabe_Football_Simulation.Vector(560, 350), new Endaufgabe_Football_Simulation.Vector(650, 150), new Endaufgabe_Football_Simulation.Vector(250, 206), new Endaufgabe_Football_Simulation.Vector(250, 512), new Endaufgabe_Football_Simulation.Vector(100, 90)];
        let linesPos = [new Endaufgabe_Football_Simulation.Vector(140, 593), new Endaufgabe_Football_Simulation.Vector(812, 7)]; //starting positions are on the upper and lower lines, one to the right and the other to the left
        let refPos = (new Endaufgabe_Football_Simulation.Vector(575, 250)); //starting Position for the referee is set near the middle (because that is where the ball is in the beginning)
        //declare a variable for the player numbers and assign them an Array with number 1-11 (for both teams)
        let playerNo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
        //a for-loop to assign player 1-11 from team 1 all the stats (like position, velocity, shirt color etc.); loop runs for 11 players then it stops
        for (let i = 0; i < 11; i++) {
            //velocity and precision is generated for each player according to the user's chosen min and max values for team 1 (values in between)
            let playerVelocity = randomNo(minVelocity1, maxVelocity1);
            let playerPrecision = randomNo(minPrecision1, maxPrecision1);
            //a variable for the player is created with the chosen and randomised stats
            let player = new Endaufgabe_Football_Simulation.Player(pos1[i], playerVelocity, shirtColor1, playerPrecision, playerNo[i], "1");
            //then the player gets drawn and pushed into the moveable and player array
            player.draw();
            moveables.push(player);
            Endaufgabe_Football_Simulation.players.push(player);
            team1Players.push(player);
        }
        //a for-loop to assign player 1-11 from team 2 all the stats (like position, velocity, shirt color etc.); loop runs for 11 players then it stops
        for (let i = 0; i < 11; i++) {
            //velocity and precision is generated for each player according to the user's chosen min and max values for team 1 (values in between)
            let playerVelocity = randomNo(minVelocity2, maxVelocity2);
            let playerPrecision = randomNo(minPrecision2, maxPrecision2);
            //a variable for the player is created with the chosen and randomised stats
            let player = new Endaufgabe_Football_Simulation.Player(pos2[i], playerVelocity, shirtColor2, playerPrecision, playerNo[i], "2");
            //then the player gets drawn and pushed into the moveable and player array
            player.draw();
            moveables.push(player);
            Endaufgabe_Football_Simulation.players.push(player);
            team2Players.push(player);
        }
        for (let i = 0; i < 2; i++) {
            //set the velocity of the referee to a random number, I choose 50 because it's the middle of the possible velocity
            let linesVelocity = 0.01;
            //declare the referee variable and the starting position and velocity is assigned
            let linesman = new Endaufgabe_Football_Simulation.Linesman(linesPos[i], linesVelocity, linesmanColor);
            //draw the referee and push them into the moveable array
            linesman.draw();
            moveables.push(linesman);
        }
        //set the velocity of the referee to a random number, I choose 50 because it's the middle of the possible velocity
        let refVelocity = 0.01;
        //declare the referee variable and the starting position and velocity is assigned
        let referee = new Endaufgabe_Football_Simulation.Referee(refPos, refVelocity, refColor);
        //draw the referee and push them into the moveable array
        referee.draw();
        moveables.push(referee);
        //draw the ball and place it in the middle of the field
        Endaufgabe_Football_Simulation.football = new Endaufgabe_Football_Simulation.Ball(new Endaufgabe_Football_Simulation.Vector(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2), 0.015);
        Endaufgabe_Football_Simulation.football.draw();
        moveables.push(Endaufgabe_Football_Simulation.football);
    }
    //animates the canvas
    function update() {
        //requests that the browser updates the animation
        requestAnimationFrame(update);
        //erases the previously drawn canvas
        Endaufgabe_Football_Simulation.crc2.clearRect(0, 0, Endaufgabe_Football_Simulation.crc2.canvas.width, Endaufgabe_Football_Simulation.crc2.canvas.height);
        //paints the data from the given ImageData onto the canvas
        Endaufgabe_Football_Simulation.crc2.putImageData(Endaufgabe_Football_Simulation.imageData, 0, 0);
        //determines if the game is frozen, if not the moveables are drawn and can still move
        if (!Endaufgabe_Football_Simulation.freeze) {
            for (let moveable of moveables) {
                moveable.move();
                moveable.draw();
            }
            //if it is, the moveables get drawn but they can't move until the game continues
        }
        else {
            for (let moveable of moveables) {
                moveable.draw();
            }
            Endaufgabe_Football_Simulation.football.move();
            Endaufgabe_Football_Simulation.football.draw();
        }
        showBallPossession();
    }
    //get the info about the player you click on
    function getPlayerInfo(_event) {
        //return the DOMRect object and get information about the size of the canvas and it's relative position on the viewport
        let rect = Endaufgabe_Football_Simulation.canvas.getBoundingClientRect();
        //subtract the rect from the clicked x- and y-position to get the accurate coordinates
        let x = _event.clientX - rect.left;
        let y = _event.clientY - rect.top;
        let mousePosition = new Endaufgabe_Football_Simulation.Vector(x, y);
        for (let player of Endaufgabe_Football_Simulation.players) {
            //if the user clicks on a player the function to show the players info is called
            if (player.position.x - 10 < mousePosition.x && player.position.x + 10 > mousePosition.x && player.position.y - 10 < mousePosition.y && player.position.y + 10 > mousePosition.y) {
                Endaufgabe_Football_Simulation.selectedPlayer = player;
                showPlayerInfo();
            }
        }
    }
    //switch a player with another one with a different number and stats
    function switchPlayer(_event) {
        if (Endaufgabe_Football_Simulation.selectedPlayer.team == "1") { //checks to see if the chosen player is from team 1
            Endaufgabe_Football_Simulation.selectedPlayer.velocity = randomNo(minVelocity1, maxVelocity1); //gives the player a new velocity and precision
            Endaufgabe_Football_Simulation.selectedPlayer.precision = randomNo(minPrecision1, maxPrecision1);
            Endaufgabe_Football_Simulation.selectedPlayer.playerNo = team1Players.length + timesSwitched1; //adds 1 to the player number length of team 1 -> new player number
            timesSwitched1++;
        }
        else { //if the player is from team two this else-function will be called
            Endaufgabe_Football_Simulation.selectedPlayer.playerNo = team2Players.length + timesSwitched2; //adds 1 to the player number length of team 2 -> new player number
            Endaufgabe_Football_Simulation.selectedPlayer.velocity = randomNo(minVelocity2, maxVelocity2);
            Endaufgabe_Football_Simulation.selectedPlayer.precision = randomNo(minPrecision2, maxPrecision2);
            timesSwitched2++;
        }
        showPlayerInfo();
    }
    //finds the DOM-elements which display the players info and changes those infos according to the player that was selected
    function showPlayerInfo() {
        document.querySelector("#infoTeam").innerHTML = "Team: " + Endaufgabe_Football_Simulation.selectedPlayer.team;
        document.querySelector("#infoNumber").innerHTML = "Number: " + Endaufgabe_Football_Simulation.selectedPlayer.playerNo;
        document.querySelector("#infoVelocity").innerHTML = "Velocity: " + Endaufgabe_Football_Simulation.selectedPlayer.velocity;
        document.querySelector("#infoPrecision").innerHTML = "Precision: " + Endaufgabe_Football_Simulation.selectedPlayer.precision;
    }
    //makes it able for the user to shoot the ball, if a player is in possession of it
    function shootBall(_event) {
        //if a player is in possession of the ball and the game is frozen it will unfreeze the game, so the user can shoot the ball
        if (Endaufgabe_Football_Simulation.freeze && ballPossessed) {
            Endaufgabe_Football_Simulation.freeze = false;
            for (let player of Endaufgabe_Football_Simulation.players) {
                if (player.inPossession) {
                    player.inPossession = false;
                    //
                    let rect = Endaufgabe_Football_Simulation.canvas.getBoundingClientRect();
                    //the user can click somewhere on the field and the position where the ball should roll to gets calculated
                    let mousePosition = new Endaufgabe_Football_Simulation.Vector(_event.clientX - rect.left, _event.clientY - rect.top);
                    //declare the variable direction that gets the distance between the clicked position and the ball
                    let direction = new Endaufgabe_Football_Simulation.Vector(mousePosition.x - Endaufgabe_Football_Simulation.football.position.x, mousePosition.y - Endaufgabe_Football_Simulation.football.position.y);
                    //the currentPrecision value will change depending on the distance between clicked position and the ball
                    //if the distance is greater than 500 the currentPrecision will increase by 20
                    if (direction.length > 500) {
                        Endaufgabe_Football_Simulation.currentPrecision += 20;
                        console.log("worst case scenario");
                        //if the distance is greater than 250 the currentPrecision will increase by 10
                    }
                    else if (direction.length > 170) {
                        Endaufgabe_Football_Simulation.currentPrecision += 10;
                        console.log("medium case scenario");
                        //if the distance is smaller than 250 the currentPrecision will increase by 5
                    }
                    else {
                        Endaufgabe_Football_Simulation.currentPrecision += 1;
                        console.log("best case scenario");
                    }
                    //the new calculated position will be set as the new football position
                    let newTarget = new Endaufgabe_Football_Simulation.Vector(mousePosition.x - Endaufgabe_Football_Simulation.currentPrecision, mousePosition.y - Endaufgabe_Football_Simulation.currentPrecision);
                    Endaufgabe_Football_Simulation.football.target = newTarget;
                }
            }
        }
    }
    //checks if the ball is currently in possession
    function ballPossessed() {
        let ballPossessed = false;
        for (let player of Endaufgabe_Football_Simulation.players) {
            if (player.inPossession) {
                ballPossessed = true;
            }
        }
        return ballPossessed;
    }
    //shows who is currently in possession of the ball
    function showBallPossession() {
        for (let player of Endaufgabe_Football_Simulation.players) {
            if (player.inPossession) {
                Endaufgabe_Football_Simulation.currentPlayer = player;
                //finds the DOM-elements which display the player in possession of the ball and changes those infos accordingly
                document.querySelector("#inPossession").innerHTML = "Player " + Endaufgabe_Football_Simulation.currentPlayer.playerNo + " of Team " + Endaufgabe_Football_Simulation.currentPlayer.team;
            }
        }
    }
    //return a random number between the min and max velocity and precision that was chosen on the form
    function randomNo(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=main.js.map