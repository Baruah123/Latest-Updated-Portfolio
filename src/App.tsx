import { Canvas } from '@react-three/fiber';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Scene from './components/Scene';
import ProjectCard from './components/ProjectCard';
import Contact from './components/Contact';
import Navbar3D from './components/Navbar3D';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Game from './components/Game';
import { ChevronDown } from 'lucide-react';

// Throttle function with specific type for MouseEvent
const throttle = <T extends (e: MouseEvent) => void>(
  func: T,
  limit: number
): ((e: MouseEvent) => void) => {
  let inThrottle: number | null = null;
  return (e: MouseEvent) => {
    if (!inThrottle) {
      func(e);
      inThrottle = setTimeout(() => (inThrottle = null), limit);
    }
  };
};

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isGameActive, setIsGameActive] = useState(false);

  const handleMouseMove = useCallback(
    throttle((e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    }, 16),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const projects = [
    {
      title: "Online Examination Platform",
      description: "A full-stack platform with user authentication, real-time exam feedback, and progress tracking.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      github: "https://github.com",
      demo: "https://demo.com",
      tags: ["React", "Node.js", "MongoDB", "Tailwind"],
      features: ["User Auth", "Real-time", "Progress Tracking"]
    },
    {
      title: "Blockchain Gallery",
      description: "A cutting-edge platform combining blockchain technology with art and collectibles.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      github: "https://github.com",
      demo: "https://demo.com",
      tags: ["TypeScript", "Solidity", "Web3"],
      features: ["NFT Minting", "Smart Contracts", "Gallery View"]
    },
    {
      title: "AI Chat Application",
      description: "A real-time chat app powered by AI with natural language processing capabilities.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      github: "https://github.com",
      demo: "https://demo.com",
      tags: ["React", "Python", "WebSocket", "NLP"],
      features: ["AI Responses", "Real-time Chat", "Multi-user"]
    },
    {
      title: "Fitness Tracker",
      description: "A mobile-responsive web app for tracking workouts and nutrition.",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      github: "https://github.com",
      demo: "https://demo.com",
      tags: ["Vue.js", "Firebase", "Tailwind"],
      features: ["Workout Logs", "Nutrition Tracking", "Progress Charts"]
    },
    {
      title: "E-commerce Dashboard",
      description: "An admin dashboard for managing products, orders, and analytics with an intuitive interface.",
      image: "https://images.unsplash.com/photo-1666875753105-005e52f17a54?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80", // Added valid image
      github: "https://github.com",
      demo: "https://demo.com",
      tags: ["Next.js", "PostgreSQL", "Chart.js"],
      features: ["Order Management", "Analytics", "Inventory Control"]
    }
  ];

  const userImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80";

  return (
    <div className="bg-black text-white min-h-screen overflow-x-hidden">
      <Navbar3D />

      {/* Hero Section */}
      <section id="hero" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-black via-indigo-950 to-black">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,#6366F1_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        <div className="flex flex-col md:flex-row items-center justify-center h-screen max-w-7xl mx-auto px-4">
          <motion.div
            className="md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10 p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRW8yZ2L_os8yGUnnAltT9fcdf1BFIbSD2tjg&s"
                alt="Avoy Baruah"
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-indigo-600 shadow-xl object-cover"
                loading="lazy"
              />
            </motion.div>

            <motion.h1
              className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Avoy Baruah
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Full Stack Web Developer
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-gray-400 max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Passionate about building dynamic web solutions. B.Tech student specializing in Cloud Technology and Information Security.
            </motion.p>
          </motion.div>

          <div className="md:w-1/2 h-[50vh] md:h-full relative">
            <Canvas
              shadows={false}
              camera={{ position: [0, 0, 5], fov: 60 }}
              className="rounded-lg shadow-2xl"
              gl={{ antialias: true, powerPreference: 'high-performance' }}
            >
              <Suspense fallback={null}>
                <Scene mousePosition={mousePosition} />
              </Suspense>
            </Canvas>
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 to-transparent rounded-lg pointer-events-none"></div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
        >
          <ChevronDown size={40} className="text-indigo-400 drop-shadow-md" />
        </motion.div>
      </section>

      {/* Game Section */}
      <section className="relative z-10 py-32 bg-gradient-to-b from-black to-indigo-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-md"
          >
            Take a Break!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-300 mb-10 text-lg"
          >
            Pilot your spaceship to collect energy orbs!
          </motion.p>
          {isGameActive ? (
            <div className="relative bg-gray-900/50 rounded-xl p-4 shadow-xl border border-indigo-800/50">
              <Game />
            </div>
          ) : (
            <div
              onMouseEnter={() => setIsGameActive(true)}
              className="relative bg-gray-900/50 rounded-xl p-4 shadow-xl border border-indigo-800/50 text-center text-gray-400 cursor-pointer hover:bg-indigo-900/20 transition-colors"
            >
              Hover to play!
            </div>
          )}
        </div>
      </section>

      <Skills />
      <Experience />

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-32 bg-gradient-to-b from-indigo-950 to-black">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,#6366F1_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400 drop-shadow-md"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center text-gray-400 mb-10 text-lg max-w-2xl mx-auto"
          >
            Explore my latest creations built with modern technologies and innovative solutions.
          </motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="#contact"
              className="inline-block px-6 py-3 bg-indigo-600/80 hover:bg-indigo-700 rounded-full text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Want to collaborate on a project? Let’s talk!
            </a>
          </motion.div>
        </div>
      </section>

      <section id="contact" className="relative z-10 bg-gradient-to-t from-indigo-950 to-black py-20">
        <Contact />
      </section>
    </div>
  );
}

export default App;