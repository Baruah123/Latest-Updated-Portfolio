import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function CosmicCollector() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [highScore, setHighScore] = useState(() => Number(localStorage.getItem('cosmicHighScore')) || 0);
  const playerRef = useRef<{ x: number; y: number; velocity: number }>({ x: 0, y: 0, velocity: 0 });

  useEffect(() => {
    if (gameState !== 'playing' || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    let animationFrameId: number;
    let particles: Particle[] = [];
    let obstacles: Obstacle[] = [];
    let lastTime = performance.now();
    const SPAWN_RATE = 0.03;
    const OBSTACLE_RATE = 0.01;

    class Particle {
      x: number;
      y: number;
      size: number;
      speed: number;
      color: string;
      glow: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speed = Math.random() * 2 + 2;
        this.color = `hsl(${Math.random() * 60 + 180}, 80%, 60%)`;
        this.glow = Math.random() * 0.5 + 0.5;
      }

      update(delta: number) {
        this.y += this.speed * delta;
        const dx = this.x - playerRef.current.x;
        const dy = this.y - playerRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 30) {
          setScore(prev => prev + 1);
          return false;
        }
        return this.y < canvas.height + this.size;
      }

      draw() {
        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    class Obstacle {
      x: number;
      y: number;
      size: number;
      speed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -20;
        this.size = Math.random() * 15 + 10;
        this.speed = Math.random() * 1.5 + 1;
      }

      update(delta: number) {
        this.y += this.speed * delta;
        const dx = this.x - playerRef.current.x;
        const dy = this.y - playerRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + 20) {
          setGameState('gameover');
          return false;
        }
        return this.y < canvas.height + this.size;
      }

      draw() {
        ctx.fillStyle = '#FF4444';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const targetX = e.clientX - rect.left;
      playerRef.current.x += (targetX - playerRef.current.x) * 0.15; // Smooth movement
      playerRef.current.y = canvas.height - 40;
    };

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      playerRef.current.x = canvas.width / 2;
      playerRef.current.y = canvas.height - 40;
    };

    const drawPlayer = () => {
      ctx.save();
      ctx.fillStyle = '#00FFFF';
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#00FFFF';
      ctx.beginPath();
      ctx.moveTo(playerRef.current.x, playerRef.current.y - 15);
      ctx.lineTo(playerRef.current.x - 20, playerRef.current.y + 15);
      ctx.lineTo(playerRef.current.x + 20, playerRef.current.y + 15);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = (time: number) => {
      const delta = (time - lastTime) / 16.67; // Normalize to 60fps
      lastTime = time;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Spawn particles and obstacles
      if (Math.random() < SPAWN_RATE) particles.push(new Particle());
      if (Math.random() < OBSTACLE_RATE) obstacles.push(new Obstacle());

      // Update and draw particles
      particles = particles.filter(p => p.update(delta));
      particles.forEach(p => p.draw());

      // Update and draw obstacles
      obstacles = obstacles.filter(o => o.update(delta));
      obstacles.forEach(o => o.draw());

      drawPlayer();
      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resizeCanvas);
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameState]);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('cosmicHighScore', score.toString());
    }
  }, [score, highScore]);

  const resetGame = () => {
    setScore(0);
    setGameState('playing');
    playerRef.current.x = canvasRef.current?.clientWidth ? canvasRef.current.clientWidth / 2 : 0;
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[400px] bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl">
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* HUD */}
      {gameState !== 'idle' && (
        <div className="absolute top-4 left-4 right-4 flex justify-between text-white font-semibold z-10">
          <div>Score: {score}</div>
          <div>High Score: {highScore}</div>
        </div>
      )}

      {/* Start Screen */}
      {gameState === 'idle' && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold text-indigo-400 mb-4">Cosmic Collector</h2>
          <p className="text-gray-300 mb-6">Move your ship to collect energy orbs, avoid obstacles!</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGameState('playing')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg"
          >
            Start Game
          </motion.button>
        </motion.div>
      )}

      {/* Game Over Screen */}
      {gameState === 'gameover' && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2 className="text-3xl font-bold text-red-400 mb-4">Game Over</h2>
          <p className="text-white text-xl mb-2">Score: {score}</p>
          <p className="text-gray-300 mb-6">High Score: {highScore}</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetGame}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-lg"
          >
            Play Again
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}