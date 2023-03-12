import { useEffect, useRef } from "react";
import sounds from "../../sounds";
import "./Pong.scss"

const Game = {
  ball: { x: 0, y: 0, radius: 0, dx: 0, dy: 0 },
  paddle: { x: 0, y: 0, width: 0, height: 0 },
  gameOver: false
};

function GamePong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = (canvas: HTMLCanvasElement) => {
    Game.ball = { x: 50, y: 50, radius: 10, dx: 5, dy: 5 };
    Game.paddle = { x: canvas.width / 2 - 40, y: canvas.height - 20, width: 80, height: 10 };
    Game.gameOver = false;
  }

  const drawBall = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.arc(Game.ball.x, Game.ball.y, Game.ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  };

  const drawPaddle = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.rect(Game.paddle.x, Game.paddle.y, Game.paddle.width, Game.paddle.height);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();
  };

  const moveBall = (canvas: HTMLCanvasElement) => {
    let { x, y, dx, dy, radius } = Game.ball;
    x += dx;
    y += dy;

    if (x < radius || x > canvas.width - radius) {
      dx *= -1;
    }

    if (y < radius) {
      dy *= -1;
    } else if (y <= canvas.height - radius - Game.paddle.height) {
      // pass
    } else if (x > Game.paddle.x && x < Game.paddle.x + Game.paddle.width) {
      dy *= -1;
    } else {
      Game.gameOver = true;
    }
    if (dx != Game.ball.dx || dy != Game.ball.dy)
      sounds.popSound.play();
    Game.ball = { x, y, dx, dy, radius };
  };

  const gameLoop = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    if (!Game.gameOver) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawBall(context);
      drawPaddle(context);
      moveBall(canvas);
      window.requestAnimationFrame(() => gameLoop(canvas, context));
    } else {
      console.log('Game Over');
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    init(canvas);
    gameLoop(canvas, context);
    return () => {
      Game.gameOver = true;
    }
  }, []);

  const handlePaddle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasWidth = canvas.clientWidth;
    const mouseX = e.nativeEvent.offsetX;
    const ratio = mouseX / canvasWidth;
    const trackWidth = canvasWidth + Game.paddle.width;
    Game.paddle.x = ratio * trackWidth - (Game.paddle.width / 2);
  };

  return (
    <div className="pong-component">
      <canvas ref={canvasRef} onMouseMove={handlePaddle} height={320 * 2} width={240 * 2} />
    </div>
  );
}

export default GamePong;
