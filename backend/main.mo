import Nat "mo:base/Nat";

import Float "mo:base/Float";
import Int "mo:base/Int";
import Debug "mo:base/Debug";

actor Pong {
  // Game constants
  let PADDLE_HEIGHT : Float = 100.0;
  let PADDLE_WIDTH : Float = 10.0;
  let BALL_RADIUS : Float = 5.0;
  let CANVAS_WIDTH : Float = 800.0;
  let CANVAS_HEIGHT : Float = 400.0;

  // Game state
  stable var leftPaddleY : Float = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2.0;
  stable var rightPaddleY : Float = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2.0;
  stable var ballX : Float = CANVAS_WIDTH / 2.0;
  stable var ballY : Float = CANVAS_HEIGHT / 2.0;
  stable var ballSpeedX : Float = 5.0;
  stable var ballSpeedY : Float = 5.0;
  stable var leftScore : Nat = 0;
  stable var rightScore : Nat = 0;

  // Update paddle positions
  public func updateLeftPaddle(y : Float) : async () {
    leftPaddleY := Float.max(0.0, Float.min(y, CANVAS_HEIGHT - PADDLE_HEIGHT));
  };

  public func updateRightPaddle(y : Float) : async () {
    rightPaddleY := Float.max(0.0, Float.min(y, CANVAS_HEIGHT - PADDLE_HEIGHT));
  };

  // Update game state
  public func updateGameState() : async () {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY - BALL_RADIUS < 0.0 or ballY + BALL_RADIUS > CANVAS_HEIGHT) {
      ballSpeedY := -ballSpeedY;
    };

    // Ball collision with paddles
    if (ballX - BALL_RADIUS < PADDLE_WIDTH and ballY > leftPaddleY and ballY < leftPaddleY + PADDLE_HEIGHT) {
      ballSpeedX := Float.abs(ballSpeedX);
    } else if (ballX + BALL_RADIUS > CANVAS_WIDTH - PADDLE_WIDTH and ballY > rightPaddleY and ballY < rightPaddleY + PADDLE_HEIGHT) {
      ballSpeedX := -Float.abs(ballSpeedX);
    };

    // Ball out of bounds
    if (ballX < 0.0) {
      rightScore += 1;
      resetBall();
    } else if (ballX > CANVAS_WIDTH) {
      leftScore += 1;
      resetBall();
    };
  };

  // Reset ball position
  func resetBall() {
    ballX := CANVAS_WIDTH / 2.0;
    ballY := CANVAS_HEIGHT / 2.0;
    ballSpeedX := if (Float.abs(ballSpeedX) == ballSpeedX) 5.0 else -5.0;
    ballSpeedY := 5.0;
  };

  // Get game state
  public query func getGameState() : async {
    leftPaddleY : Float;
    rightPaddleY : Float;
    ballX : Float;
    ballY : Float;
    leftScore : Nat;
    rightScore : Nat;
  } {
    return {
      leftPaddleY = leftPaddleY;
      rightPaddleY = rightPaddleY;
      ballX = ballX;
      ballY = ballY;
      leftScore = leftScore;
      rightScore = rightScore;
    };
  };

  // Reset game
  public func resetGame() : async () {
    leftPaddleY := (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2.0;
    rightPaddleY := (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2.0;
    resetBall();
    leftScore := 0;
    rightScore := 0;
  };
}
