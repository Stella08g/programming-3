var socket = io();


var side = 20;
function setup() {
    frameRate(5);
    createCanvas(matrix[0].length * side, matrix.length * side);
    background('#acacac');



function nkarel(matrix) {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("purple");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("orange");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill("black");
                rect(x * side, y * side, side, side);
            }
        }
    }
    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (let j in grassEaterArr) {
        grassEaterArr[j].mul()
        grassEaterArr[j].eat()
    }
    for (let j in predatorArr) {
        predatorArr[j].mul()
        predatorArr[j].eat()
    }
    for (var i in buysArr) {
        buysArr[i].mul();
    }
    for (let j in buysEaterArr) {
        buysEaterArr[j].mul()
        buysEaterArr[j].eat()
    }
}

setInterval(
    function () {
    socket.on('send matrix', nkarel)
    },1000
)}
