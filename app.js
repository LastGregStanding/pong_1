"use strict";

const grid = document.querySelector('.grid');
const score = [0, 0]
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

//Draw boundaries
for (let i = 0; i < 16320; i++) {
    if (i < 204 || i > 16116) {
        squares[i].style.backgroundColor = 'white'
    }
}

// Draw net
const net = [];
for (let i = 0; i < 79; i++) {
    i++;
    let square = (width * i) + 104;
    squares[square].classList.add('net');
    net.push(square);
}

let player1Index = 7344;
let player2Index = 7547;

//#region Draw/UnDraw Players

const player1 = [];
for (let i = 0; i < 11; i++) {
    let square = width * i;
    player1.push(square);
}

const player2 = [];
for (let i = 0; i < 11; i++) {
    let square = width * i;
    player2.push(square);
}


const drawPlayer1 = function () {
    player1.forEach((e) => squares[e + player1Index].classList.add('playerOne'))
}
const undrawPlayer1 = function () {
    player1.forEach((e) => squares[e + player1Index].classList.remove('playerOne'))
}
const drawPlayer2 = function () {
    player1.forEach((e) => squares[e + player2Index].classList.add('playerTwo'))
}
const undrawPlayer2 = function () {
    player1.forEach((e) => squares[e + player2Index].classList.remove('playerTwo'))
}
//#endregion

drawPlayer1();
drawPlayer2();

// Player movement
document.addEventListener('keydown', function (e) {
    switch (e.keyCode) {

        //player1 Move Up
        case 87:
            undrawPlayer1();
            if (player1.some((e) => e + player1Index === 0)) {
                player1Index += width * 3;
            }
            player1Index -= width * 3;
            drawPlayer1();
            break;

        //player1 Move Down
        case 83:
            undrawPlayer1();
            if (player1.some((e) => (e + player1Index) === 16116)) {
                player1Index -= (width * 3);
            }
            player1Index += width * 3;
            drawPlayer1();
            break;

        //player2 Move Up
        case 79:
            undrawPlayer2();
            if (player2.some((e) => e + player2Index === 203)) {
                player2Index += width * 3;
            }
            player2Index -= width * 3;
            drawPlayer2();
            break;

        //player2 Move Down
        case 76:
            undrawPlayer2();
            if (player2.some((e) => e + player2Index === 16319)) {
                player2Index -= width * 3;
            }
            player2Index += width * 3;
            drawPlayer2();
            break;
    }
})

let ball = [0, 1, width, width + 1];
let ballIndex = 7856;

//#region Ball Directions
const upRight = -width + 1;
const upLeft = -width - 1;
const downRight = width + 1;
const downLeft = width - 1;
//#endregion 

let direction = downLeft;

//#region Draw Ball
const drawBall = function () {
    ball.forEach((e) => squares[e + ballIndex].classList.add('ball'))
}
const undrawBall = function () {
    ball.forEach((e) => squares[e + ballIndex].classList.remove('ball'))
}
//#endregion 

drawBall();

// Ball mechanics and Scoring
const ballMove = function () {
    undrawBall();

    // If ball hits the top
    if (ball.some((e) => (e + ballIndex + direction) < 0)) {
        switch (direction) {
            case upRight:
                direction = downRight;
                break;
            case upLeft:
                direction = downLeft;
                break;
        }
    }

    // If ball hits the bottom
    if (ball.some((e) => (e + ballIndex + direction) > 16319)) {
        switch (direction) {
            case downRight:
                direction = upRight;
                break;
            case downLeft:
                direction = upLeft;
                break;
        }
    }

    // If ball hits player 1
    if ((ball.some((e) => squares[e + ballIndex].classList.contains('playerOne')))) {
        switch (direction) {
            case upLeft:
                direction = upRight;
                break;
            case downLeft:
                direction = downRight;
                break;
        }
    }

    // If ball hits player 2
    if ((ball.some((e) => squares[e + ballIndex].classList.contains('playerTwo')))) {
        switch (direction) {
            case downRight:
                direction = downLeft;
                break;
            case upRight:
                direction = upLeft;
                break;
        }
    }

    ballIndex += direction;
    drawBall();

    // Score Player 1
    if (ball.some((e) => (e + ballIndex + 1) % 204 === 0 &&
        !squares[e + ballIndex].classList.contains('playerTwo')
    )) {
        score[0]++;
        // Change number
        player1Score.forEach((e) => squares[e + 1104].style.backgroundColor = 'black')
        player1Score = scoreNumbers[score[0]];
        player1Score.forEach((e) => squares[e + 1104].style.backgroundColor = 'white')
        // Start next game
        clearInterval(playGame)
        newPoint();
        direction = downRight;
    }

    // Score Player 2
    if (ball.some((e) => (e + ballIndex) % 204 === 0 &&
        !squares[e + ballIndex].classList.contains('playerOne')
    )) {
        score[1]++;
        // Change number
        player2Score.forEach((e) => squares[e + 1134].style.backgroundColor = 'black')
        player2Score = scoreNumbers[score[1]];
        player2Score.forEach((e) => squares[e + 1134].style.backgroundColor = 'white')
        // Start next game
        clearInterval(playGame)
        newPoint();
        direction = downLeft;
    }
}

const newPoint = function () {
    undrawBall();
    ballIndex = 7856;
    drawBall();
}

// Score numbers
const scoreNumbers = [

    // zero
    [2, 3, 4, 5, 6, 7, 8, width + 2, width * 2 + 2, width * 3 + 2, width * 4 + 2, width * 5 + 2, width * 6 + 2, width * 6 + 3, width * 6 + 4, width * 6 + 5, width * 6 + 6, width * 6 + 7, width * 6 + 8, width * 5 + 8, width * 4 + 8, width * 3 + 8, width * 2 + 8, width * 1 + 8],
    // one
    [5, width + 5, width * 2 + 5, width * 3 + 5, width * 4 + 5, width * 5 + 5, width * 6 + 5],
    // two
    [width + 1, width + 2, 2, 3, 4, 5, width + 6, width * 2 + 5, width * 3 + 4, width * 4 + 3, width * 5 + 2, width * 6 + 2, width * 6 + 3, width * 6 + 4, width * 6 + 5, width * 6 + 6, width * 6 + 7],
    // three
    [1, 2, 3, 4, 5, width + 5, width * 2 + 5, width * 3 + 5, width * 4 + 5, width * 5 + 5, width * 6 + 5, width * 3 + 4, width * 3 + 3, width * 3 + 2, width * 6 + 4, width * 6 + 3, width * 6 + 2, width * 6 + 1],
    // four
    [1, 5, width + 5, width * 2 + 5, width * 3 + 5, width * 4 + 5, width * 5 + 5, width * 6 + 5, width + 1, width * 2 + 1, width * 2 + 2, width * 2 + 3, width * 2 + 4, width * 2 + 6, width * 2 + 7],

];

let player1Score = scoreNumbers[score[0]];
let player2Score = scoreNumbers[score[1]];
player1Score.forEach((e) => squares[e + 1104].style.backgroundColor = 'white')
player2Score.forEach((e) => squares[e + 1134].style.backgroundColor = 'white')

let playGame;

// Play Game
document.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        playGame = setInterval(ballMove, 20)
    }
})


// Things I want to add:
// Everytime the ball is hit the game speeds up
// Implement the large scores in the game 




