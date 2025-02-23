import { motion } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiReact, SiNodedotjs, 
  SiTensorflow, SiMongodb, SiExpress, SiTailwindcss 
} from 'react-icons/si';

export default function Skills() {
  const skills = [
    { name: 'Python', level: 90, icon: SiPython, color: '#3776AB' },
    { name: 'JavaScript', level: 85, icon: SiJavascript, color: '#F7DF1E' },
    { name: 'React', level: 85, icon: SiReact, color: '#61DAFB' },
    { name: 'Node.js', level: 80, icon: SiNodedotjs, color: '#339933' },
    { name: 'TensorFlow', level: 75, icon: SiTensorflow, color: '#FF6F00' },
    { name: 'MongoDB', level: 80, icon: SiMongodb, color: '#47A248' },
    { name: 'Express.js', level: 80, icon: SiExpress, color: '#000000' },
    { name: 'Tailwind CSS', level: 85, icon: SiTailwindcss, color: '#06B6D4' },
  ];

  const languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'Hindi', level: 'Fluent' },
    { name: 'Assamese', level: 'Native' },
  ];

  const certifications = [
    'Intermediate React, v5',
    'Service Now Micro Certification',
    'Software Engineer Intern Certificate',
    'Google Cloud Generative AI Certification'
  ];

  // Animation variants with smooth easing
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        duration: 0.6, 
        ease: 'easeInOut', 
        when: 'beforeChildren', 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: 'easeInOut' 
      }
    }
  };

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-5xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
        >
          Skills & Expertise
        </motion.h2>

        {/* Technical Skills */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white flex items-center justify-center gap-2">
            <span className="w-6 h-1 bg-indigo-500 rounded-full"></span>
            Technical Skills
            <span className="w-6 h-1 bg-indigo-500 rounded-full"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill) => {
              const SkillIcon = skill.icon;
              return (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                  className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:bg-gray-800/80 transition-colors duration-300"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <SkillIcon size={20} color={skill.color} />
                    <span className="font-medium text-white">{skill.name}</span>
                  </div>
                  <div className="h-2 bg-gray-900 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                      className="h-full rounded-full"
                      style={{ background: skill.color }}
                    />
                  </div>
                  <span className="text-xs text-gray-400 mt-1 block">{skill.level}% Proficiency</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-2xl font-semibold mb-6 text-white flex items-center justify-center gap-2">
            <span className="w-6 h-1 bg-purple-500 rounded-full"></span>
            Languages
            <span className="w-6 h-1 bg-purple-500 rounded-full"></span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {languages.map((lang) => (
              <motion.div
                key={lang.name}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50 hover:bg-gray-800/80 transition-colors duration-300 text-center"
              >
                <h4 className="font-medium text-white mb-1">{lang.name}</h4>
                <p className="text-purple-400 text-xs px-2 py-1 bg-purple-900/30 rounded-full inline-block">
                  {lang.level}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div 
          variants={containerVariants} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-white flex items-center justify-center gap-2">
            <span className="w-6 h-1 bg-pink-500 rounded-full"></span>
            Certifications
            <span className="w-6 h-1 bg-pink-500 rounded-full"></span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.3, ease: 'easeOut' } }}
                className="bg-gray-800 p-5 rounded-lg border border-gray-700/50 hover:bg-gray-900 transition-colors duration-300 relative"
              >
                <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs px-2 py-1 rounded-bl-sm">
                  Certified
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="w-8 h-8 bg-pink-500/20 rounded-full flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                  </motion.div>
                  <div>
                    <p className="font-semibold text-white text-base">{cert}</p>
                    <p className="text-xs text-gray-400 mt-1">Issued: Feb 2025</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}