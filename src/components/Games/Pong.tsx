import { useEffect, useRef } from "react";
import sounds from "../../sounds";
import "./Pong.scss";

const Game = {
  ball: { x: 0, y: 0, radius: 0, dx: 0, dy: 0 },
  paddle: { x: 0, y: 0, width: 0, height: 0 },
  state: "start",
  running: true
};

function GamePong() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const init = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    Game.ball = { x: canvas.width / 2, y: canvas.height - 40, radius: 10, dx: 5, dy: -5 };
    Game.paddle = { x: canvas.width / 2 - 40, y: canvas.height - 20, width: 80, height: 10 };
    Game.state = "start";
    Game.running = true;
    context.font = "48px sans-serif";
  };

  const drawStart = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.font = "48px sans-serif";
    context.fillText("Click to Start", canvas.width / 2 - 135, canvas.height / 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  };

  const drawRetry = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.font = "48px sans-serif";
    context.fillText("Game Over", canvas.width / 2 - 125, canvas.height / 2);
    context.font = "24px sans-serif";
    context.fillText("Click to Retry", canvas.width / 2 - 75, canvas.height / 2 + 50);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  };

  const drawBall = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.arc(Game.ball.x, Game.ball.y, Game.ball.radius, 0, Math.PI * 2);
    context.fillStyle = "white";
    context.fill();
    context.closePath();
  };

  const drawPaddle = (context: CanvasRenderingContext2D) => {
    context.beginPath();
    context.rect(Game.paddle.x, Game.paddle.y, Game.paddle.width, Game.paddle.height);
    context.fillStyle = "white";
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
      Game.state = "waiting2";
      setTimeout(() => Game.state = "over", 500);
    }
    if (dy != Game.ball.dy && dy < 0) {
      sounds.pop2Sound.play();
    } else if (dx != Game.ball.dx || dy != Game.ball.dy) {
      sounds.popSound.play();
    }
    Game.ball = { x, y, dx, dy, radius };
  };

  const gameLoop = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
    if (!Game.running) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    switch (Game.state) {
      case "start":
        drawStart(canvas, context);
        break;
      case "playing":
        drawBall(context);
        drawPaddle(context);
        moveBall(canvas);
        break;
      case "waiting1":
        drawBall(context);
        drawPaddle(context);
        break;
      case "waiting2":
        drawBall(context);
        drawPaddle(context);
        break;
      case "over":
        drawRetry(canvas, context);
        break;
      default:
        Game.running = false;
    }

    window.requestAnimationFrame(() => gameLoop(canvas, context));

  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    init(canvas, context);
    gameLoop(canvas, context);
    return () => {
      Game.running = false;
    };
  }, []);

  const handlePaddle = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || (Game.state != "playing" && Game.state != "waiting1")) return;
    const canvasWidth = canvas.clientWidth;
    const mouseX = e.nativeEvent.offsetX;
    const ratio = mouseX / canvasWidth;
    const trackWidth = canvasWidth + Game.paddle.width;
    Game.paddle.x = ratio * trackWidth - (Game.paddle.width / 2);
  };

  const handleClick = () => {
    const canvas = canvasRef.current;
    const context = canvasRef.current?.getContext("2d");
    if (!Game.running || !canvas || !context) return;
    if (Game.state == "start" || Game.state == "over") {
      init(canvas, context);
      Game.state = "waiting1";
      setTimeout(() => Game.state = "playing", 500);
    }

  };

  return (
    <div className="pong-component">
      <canvas ref={canvasRef} onMouseMove={handlePaddle} onClick={handleClick} height={320 * 2} width={240 * 2} />
    </div>
  );
}

export default GamePong;
