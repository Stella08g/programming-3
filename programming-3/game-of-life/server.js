var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, () => {
    console.log('connected');
});

function generator(matLen, gr, grEat) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix;
}

var matrix =  generator(20, 10, 10, 10, 10, 10);

io.sockets.emit('send matrix',matrix)

var grassArr = []
var grassEaterArr = []
var predatorArr = []
var buysArr = []
var buysEaterArr = []

Grass = require("./Grass")
GrassEater = require("./GrassEater")
buys = require("./buys")
buysEater = require("./buysEater")
predator = require("./predator")

function createObject(matrix){


for (var y = 0; y < matrix.length; ++y) {
    for (var x = 0; x < matrix[y].length; ++x) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);

        }
        else if (matrix[y][x] == 2) {
            var gr = new GrassEater(x, y, 1)
            grassEaterArr.push(gr);
        }
        else if (matrix[y][x] == 3) {
            var gr = new predator(x, y, 1)
            predatorArr.push(gr);
        }
        else if (matrix[y][x] == 4) {
            var gr = new buys(x, y, 1)
            buysArr.push(gr);
        }
        else if (matrix[y][x] == 5) {
            var gr = new buysEater(x, y, 1)
            buysEaterArr.push(gr);
        }
    }
}

io.sockets.emit('send matrix', matrix)
}

function xax(){

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

    io.sockets.emit("send matrix", matrix);
    
}

io.on('connection', function () {
    createObject(matrix)
})


