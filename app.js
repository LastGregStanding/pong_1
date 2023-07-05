"use strict";

const grid = document.querySelector('.grid');
const squares = [];
const width = 50;

const createBoard = function () {
    for (let i = 0; i < 1000; i++) {
        let cell = document.createElement('div');
        cell.classList.add('cell');
        grid.appendChild(cell);
        squares.push(cell);
    }
}

createBoard();

const player1 = [0, width, width * 2, width * 3];
const player2 = [0, width, width * 2, width * 3];

let player1Index = 150;
let player2Index = 149;

const drawPlayer1 = function () {
    player1.forEach((e) => squares[e + player1Index].classList.add('player'))
}
const drawPlayer2 = function () {
    player1.forEach((e) => squares[e + player2Index].classList.add('player'))
}

drawPlayer1();
drawPlayer2();
