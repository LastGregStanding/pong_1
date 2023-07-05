"use strict";

const grid = document.querySelector('.grid');
const squares = [];
const width = 51;

const createBoard = function () {
    for (let i = 0; i < 1020; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        squares.push(cell);
    }
}

createBoard();

const player1 = [0, width, width * 2, width * 3];
const player2 = [0, width, width * 2, width * 3];

// Draw net
const net = [];
for (let i = 0; i < 19; i++) {
    i++;
    let square = (width * i) + 26;
    squares[square].classList.add('net');
    net.push(square);
}


let player1Index = 357;
let player2Index = 407;


//#region Draw/UnDraw Players
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

document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {

        //player2 Move Up
        case 38:
            undrawPlayer2();
            player2Index -= width;
            drawPlayer2();
            break;

        //player2 Move Down
        case 40:
            undrawPlayer2();
            player2Index += width;
            drawPlayer2();
            break;

        //player1 Move Up
        case 87:
            undrawPlayer1();
            player1Index -= width;
            drawPlayer1();
            break;

        //player1 Move Down
        case 83:
            undrawPlayer1();
            player1Index += width;
            drawPlayer1();
            break;

    }


})
