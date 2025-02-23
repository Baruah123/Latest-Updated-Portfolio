import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Trophy } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'IIT Guwahati',
      position: 'Machine Learning Intern',
      period: '2023', // Adjust the year as needed
      description: [
        'Developed Rain Vision Image project using machine learning techniques to enhance image processing capabilities.',
        'Implemented and trained ML models to improve weather-related image analysis and prediction.',
        'Collaborated with research team to optimize algorithms for real-time applications.'
      ]
    },
    {
      company: 'ICM, Guwahati',
      position: 'Web Developer',
      period: '2024',
      description: [
        'Built responsive, cross-browser compatible interfaces in collaboration with design team.',
        'Managed MongoDB databases ensuring data integrity and security.',
        'Enhanced office management system functionality for improved operational efficiency.'
      ]
    }
  ];

  const education = [
    {
      school: 'Assam Downtown University',
      degree: 'B.Tech in Computer Science and Engineering',
      specialization: 'Cloud Technology and Information Security',
      period: '2021-2025',
      grade: 'CGPA: 7.9'
    }
  ];

  const achievements = [
    'Hackathon Enthusiast: Actively participated in multiple hackathons, showcasing problem-solving and rapid tech adaptation skills.',
    'Google Cloud Generative AI Certification: Mastered fundamentals and applications of generative AI using Google Cloud tools.'
  ];

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100
      }
    }
  };

  return (
    <section id="experience" className="relative z-10 py-32 bg-gradient-to-b from-black to-indigo-950">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
        >
          Experience & Education
        </motion.h2>

        {/* Work Experience */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Briefcase className="text-indigo-400" />
            Work Experience
          </h3>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative pl-8 border-l-2 border-indigo-600"
              >
                <div className="absolute -left-3 top-0 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center">
                  <Briefcase size={14} className="text-white" />
                </div>
                <div className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-300">
                  <h3 className="text-xl font-semibold mb-1 text-white">{exp.position}</h3>
                  <div className="text-indigo-400 mb-2">{exp.company}</div>
                  <div className="text-gray-400 text-sm mb-4">{exp.period}</div>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <GraduationCap className="text-indigo-400" />
            Education
          </h3>
          {education.map((edu, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-300"
            >
              <h4 className="text-xl font-semibold mb-2 text-white">{edu.school}</h4>
              <p className="text-indigo-400 mb-1">{edu.degree}</p>
              <p className="text-gray-300 mb-2">{edu.specialization}</p>
              <div className="flex justify-between text-gray-400">
                <span>{edu.period}</span>
                <span>{edu.grade}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements */}
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="mt-16">
          <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
            <Trophy className="text-indigo-400" />
            Achievements
          </h3>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-gray-900/50 p-6 rounded-lg backdrop-blur-sm hover:bg-gray-900/70 transition-colors duration-300"
              >
                <p className="text-gray-300">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}