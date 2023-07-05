"use strict";

const grid = document.querySelector('.grid');
const squares = [];
const width = 204;

const createBoard = function () {
    for (let i = 0; i < 16320; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        squares.push(cell);
    }
}

createBoard();

// Draw net
const net = [];
for (let i = 0; i < 79; i++) {
    i++;
    let square = (width * i) + 104;
    squares[square].classList.add('net');
    net.push(square);
}




let player1Index = 408;
let player2Index = 814;


//#region Draw/UnDraw Players

const player1 = [];
for (let i = 0; i < 8; i++) {
    let square = width * i;
    player1.push(square);
}

const player2 = [];
for (let i = 0; i < 8; i++) {
    let square = width * i;
    player2.push(square);
}


const drawPlayer1 = function () {
    player1.forEach((e) => squares[e + player1Index].classList.add('player'))
}
const undrawPlayer1 = function () {
    player1.forEach((e) => squares[e + player1Index].classList.remove('player'))
}
const drawPlayer2 = function () {
    player1.forEach((e) => squares[e + player2Index].classList.add('player'))
}
const undrawPlayer2 = function () {
    player1.forEach((e) => squares[e + player2Index].classList.remove('player'))
}
//#endregion

drawPlayer1();
drawPlayer2();


// Player movement
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {

        //player2 Move Up
        case 38:
            undrawPlayer2();
            if (player2Index === 50) {
                player2Index += width;
            }
            player2Index -= width;
            drawPlayer2();
            break;

        //player2 Move Down
        case 40:
            undrawPlayer2();
            if (player2Index === 866) {
                player2Index -= width;
            }
            player2Index += width;
            drawPlayer2();
            break;

        //player1 Move Up
        case 87:
            undrawPlayer1();
            if (player1Index === 0) {
                player1Index += width;
            }
            player1Index -= width;
            drawPlayer1();
            break;

        //player1 Move Down
        case 83:
            undrawPlayer1();
            if (player1Index === 816) {
                player1Index -= width;
            }
            player1Index += width;
            drawPlayer1();
            break;

    }


})


