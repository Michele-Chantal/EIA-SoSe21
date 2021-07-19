namespace Endaufgabe_Football_Simulation {

    //function to draw the field and its details on the canvas
    export function drawField(): void {
        //draw the field and style it
        crc2.beginPath();
        crc2.rect(0, 0, canvas.width, canvas.height);
        crc2.fillStyle = "#3CB371";
        crc2.fill();
        crc2.rect(5, 5, canvas.width - 10, canvas.height - 10);
        crc2.lineWidth = 1;
        crc2.strokeStyle = "white";
        crc2.stroke();
        crc2.closePath();

        //draw the middle line
        crc2.beginPath();
        crc2.moveTo(canvas.width / 2, 5);
        crc2.lineTo(canvas.width / 2, canvas.height - 5);
        crc2.stroke();
        crc2.closePath();

        //draw the circle in the middle
        crc2.beginPath();
        crc2.arc(canvas.width / 2, canvas.height / 2, 75, 0, 2 * Math.PI, false);
        crc2.stroke();
        crc2.closePath();

        //draw left goal lines
        crc2.beginPath();
        crc2.rect(5, (canvas.height - 146) / 2, 44, 146);
        crc2.stroke();
        crc2.closePath();

        //draw left goal and style it
        crc2.beginPath();
        crc2.moveTo(18, (canvas.height / 2) - 22);
        crc2.lineTo(18, (canvas.height / 2) + 22);
        crc2.lineTo(0, (canvas.height / 2) + 22);
        crc2.lineTo(0, (canvas.height / 2) - 22);
        crc2.lineTo(18, (canvas.height / 2) - 22);
        crc2.lineWidth = 2;
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.stroke();
        crc2.closePath();

        //draw right goal lines
        crc2.beginPath();
        crc2.rect(canvas.width - 44, (canvas.height - 146) / 2, 39, 146);
        crc2.stroke();
        crc2.closePath();

        //draw right goal and style it
        crc2.beginPath();
        crc2.moveTo(canvas.width - 18, (canvas.height / 2) - 22);
        crc2.lineTo(canvas.width - 18, (canvas.height / 2) + 22);
        crc2.lineTo(canvas.width, (canvas.height / 2) + 22);
        crc2.lineTo(canvas.width, (canvas.height / 2) - 22);
        crc2.lineTo(canvas.width - 18, (canvas.height / 2) - 22);
        crc2.lineWidth = 2;
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.stroke();
        crc2.closePath();
        
        imageData = crc2.getImageData(0, 0, canvas.width, canvas.height);
    }
}