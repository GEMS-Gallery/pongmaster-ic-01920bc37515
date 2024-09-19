import { backend } from 'declarations/backend';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const resetButton = document.getElementById('resetButton');

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_RADIUS = 5;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

let leftPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let rightPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
let ballX = CANVAS_WIDTH / 2;
let ballY = CANVAS_HEIGHT / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;
let leftScore = 0;
let rightScore = 0;

function drawPaddle(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
}

function drawBall(x, y) {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fill();
}

function draw() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawPaddle(0, leftPaddleY);
    drawPaddle(CANVAS_WIDTH - PADDLE_WIDTH, rightPaddleY);
    drawBall(ballX, ballY);
    leftScoreElement.textContent = leftScore;
    rightScoreElement.textContent = rightScore;
}

function updateGameState() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - BALL_RADIUS < 0 || ballY + BALL_RADIUS > CANVAS_HEIGHT) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX - BALL_RADIUS < PADDLE_WIDTH && ballY > leftPaddleY && ballY < leftPaddleY + PADDLE_HEIGHT) {
        ballSpeedX = Math.abs(ballSpeedX);
    } else if (ballX + BALL_RADIUS > CANVAS_WIDTH - PADDLE_WIDTH && ballY > rightPaddleY && ballY < rightPaddleY + PADDLE_HEIGHT) {
        ballSpeedX = -Math.abs(ballSpeedX);
    }

    // Ball out of bounds
    if (ballX < 0) {
        rightScore++;
        resetBall();
        updateBackendScore();
    } else if (ballX > CANVAS_WIDTH) {
        leftScore++;
        resetBall();
        updateBackendScore();
    }
}

function resetBall() {
    ballX = CANVAS_WIDTH / 2;
    ballY = CANVAS_HEIGHT / 2;
    ballSpeedX = ballSpeedX > 0 ? 5 : -5;
    ballSpeedY = 5;
}

async function updateBackendScore() {
    await backend.updateScore(leftScore, rightScore);
}

async function gameLoop() {
    updateGameState();
    draw();
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    
    if (event.clientX < CANVAS_WIDTH / 2) {
        leftPaddleY = Math.max(0, Math.min(mouseY, CANVAS_HEIGHT - PADDLE_HEIGHT));
    } else {
        rightPaddleY = Math.max(0, Math.min(mouseY, CANVAS_HEIGHT - PADDLE_HEIGHT));
    }
});

resetButton.addEventListener('click', async () => {
    leftScore = 0;
    rightScore = 0;
    resetBall();
    leftPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    rightPaddleY = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    await backend.resetScores();
});

async function initGame() {
    const [left, right] = await backend.getScores();
    leftScore = left;
    rightScore = right;
    gameLoop();
}

initGame();
