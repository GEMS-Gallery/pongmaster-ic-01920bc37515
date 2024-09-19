import { backend } from 'declarations/backend';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const leftScoreElement = document.getElementById('leftScore');
const rightScoreElement = document.getElementById('rightScore');
const resetButton = document.getElementById('resetButton');

const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;
const BALL_RADIUS = 5;

let leftPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;
let rightPaddleY = (canvas.height - PADDLE_HEIGHT) / 2;

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

function draw(gameState) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle(0, gameState.leftPaddleY);
    drawPaddle(canvas.width - PADDLE_WIDTH, gameState.rightPaddleY);
    drawBall(gameState.ballX, gameState.ballY);
    leftScoreElement.textContent = gameState.leftScore;
    rightScoreElement.textContent = gameState.rightScore;
}

async function gameLoop() {
    await backend.updateGameState();
    const gameState = await backend.getGameState();
    draw(gameState);
    requestAnimationFrame(gameLoop);
}

canvas.addEventListener('mousemove', async (event) => {
    const rect = canvas.getBoundingClientRect();
    const mouseY = event.clientY - rect.top;
    
    if (event.clientX < canvas.width / 2) {
        await backend.updateLeftPaddle(mouseY);
    } else {
        await backend.updateRightPaddle(mouseY);
    }
});

resetButton.addEventListener('click', async () => {
    await backend.resetGame();
});

gameLoop();
