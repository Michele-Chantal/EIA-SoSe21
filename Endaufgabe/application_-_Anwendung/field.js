"use strict";
var Endaufgabe_Football_Simulation;
(function (Endaufgabe_Football_Simulation) {
    //function to draw the field and its details on the canvas
    function drawField() {
        //draw the field and style it
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.rect(0, 0, Endaufgabe_Football_Simulation.canvas.width, Endaufgabe_Football_Simulation.canvas.height);
        Endaufgabe_Football_Simulation.crc2.fillStyle = "#3CB371";
        Endaufgabe_Football_Simulation.crc2.fill();
        Endaufgabe_Football_Simulation.crc2.rect(5, 5, Endaufgabe_Football_Simulation.canvas.width - 10, Endaufgabe_Football_Simulation.canvas.height - 10);
        Endaufgabe_Football_Simulation.crc2.lineWidth = 1;
        Endaufgabe_Football_Simulation.crc2.strokeStyle = "white";
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw the middle line
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.moveTo(Endaufgabe_Football_Simulation.canvas.width / 2, 5);
        Endaufgabe_Football_Simulation.crc2.lineTo(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height - 5);
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw the circle in the middle
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.arc(Endaufgabe_Football_Simulation.canvas.width / 2, Endaufgabe_Football_Simulation.canvas.height / 2, 75, 0, 2 * Math.PI, false);
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw left goal lines
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.rect(5, (Endaufgabe_Football_Simulation.canvas.height - 146) / 2, 44, 146);
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw left goal and style it
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.moveTo(18, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(18, (Endaufgabe_Football_Simulation.canvas.height / 2) + 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(0, (Endaufgabe_Football_Simulation.canvas.height / 2) + 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(0, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(18, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineWidth = 2;
        Endaufgabe_Football_Simulation.crc2.fillStyle = "white";
        Endaufgabe_Football_Simulation.crc2.fill();
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw right goal lines
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.rect(Endaufgabe_Football_Simulation.canvas.width - 44, (Endaufgabe_Football_Simulation.canvas.height - 146) / 2, 39, 146);
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //draw right goal and style it
        Endaufgabe_Football_Simulation.crc2.beginPath();
        Endaufgabe_Football_Simulation.crc2.moveTo(Endaufgabe_Football_Simulation.canvas.width - 18, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(Endaufgabe_Football_Simulation.canvas.width - 18, (Endaufgabe_Football_Simulation.canvas.height / 2) + 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(Endaufgabe_Football_Simulation.canvas.width, (Endaufgabe_Football_Simulation.canvas.height / 2) + 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(Endaufgabe_Football_Simulation.canvas.width, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineTo(Endaufgabe_Football_Simulation.canvas.width - 18, (Endaufgabe_Football_Simulation.canvas.height / 2) - 22);
        Endaufgabe_Football_Simulation.crc2.lineWidth = 2;
        Endaufgabe_Football_Simulation.crc2.fillStyle = "white";
        Endaufgabe_Football_Simulation.crc2.fill();
        Endaufgabe_Football_Simulation.crc2.stroke();
        Endaufgabe_Football_Simulation.crc2.closePath();
        //
        Endaufgabe_Football_Simulation.imageData = Endaufgabe_Football_Simulation.crc2.getImageData(0, 0, Endaufgabe_Football_Simulation.canvas.width, Endaufgabe_Football_Simulation.canvas.height);
    }
    Endaufgabe_Football_Simulation.drawField = drawField;
})(Endaufgabe_Football_Simulation || (Endaufgabe_Football_Simulation = {}));
//# sourceMappingURL=field.js.map