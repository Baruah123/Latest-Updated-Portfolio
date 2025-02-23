import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:5001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-32">
      <div className="max-w-4xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400"
        >
          Get In Touch
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">Let's Connect</h3>
            <p className="text-gray-400">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="space-y-4">
              <a
                href="tel:+919706840951"
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors"
              >
                <Phone size={20} />
                +91 9706840951
              </a>
              <a
                href="mailto:avoycoc123@gmail.com"
                className="flex items-center gap-3 text-gray-300 hover:text-indigo-400 transition-colors"
              >
                <Mail size={20} />
                avoycoc123@gmail.com
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin size={20} />
                Guwahati, Assam
              </div>
            </div>
            <div className="flex gap-4">
              <a
                href="mailto:avoycoc123@gmail.com"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/avoy-baruah/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-indigo-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </motion.div>
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-200"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-200"
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={4}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-200"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? 'bg-indigo-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              } text-white`}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            {status && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center ${status.includes('success') ? 'text-green-400' : 'text-red-400'}`}
              >
                {status}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}