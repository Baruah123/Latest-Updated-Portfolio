import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar3D() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

  // Animation variants for the navbar
  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: 'spring',
        stiffness: 120,
        damping: 20,
        duration: 0.8 
      }
    }
  };

  // Variants for menu items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    })
  };

  // Mobile menu variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0, transition: { duration: 0.3 } },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { 
        duration: 0.4,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-lg border-b border-gray-800/50 shadow-lg"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.span
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500"
            whileHover={{ 
              scale: 1.05,
              rotateX: 5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            Portfolio
          </motion.span>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10">
            {menuItems.map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 hover:text-indigo-400 relative group"
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ 
                  scale: 1.1,
                  y: -2,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                <motion.span
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400 origin-center"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-indigo-400 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="md:hidden py-6 px-4 bg-black/95 border-t border-gray-800/50"
            >
              <div className="flex flex-col gap-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-300 hover:text-indigo-400 text-lg font-medium relative"
                    custom={index}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.05,
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(false)}
                  >
                    {item}
                    <motion.span
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-indigo-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}