// src/pages/Home.tsx
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Code2, Palette, Database, Smartphone, 
  Globe, Shield, Cloud, Zap,
  ArrowRight, Sparkles, Users, TrendingUp,
  ShoppingCart, Hotel, Film, BookOpen
} from 'lucide-react'

const Home: React.FC = () => {
  const showcaseSections = [
    {
      title: 'Social Media Platform',
      description: 'Interactive social feed with likes, comments, and real-time updates',
      icon: <Users className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      link: '/social'
    },
    {
      title: 'E-commerce Store',
      description: 'Full-featured shopping experience with cart, favorites, and checkout',
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-500',
      link: '/ecommerce'
    },
    {
      title: 'Stock Market Tracker',
      description: 'Real-time stock prices with interactive charts and watchlists',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      link: '/stocks'
    },
    {
      title: 'Hotel Booking System',
      description: 'Advanced booking interface with date selection and pricing',
      icon: <Hotel className="w-6 h-6" />,
      color: 'from-orange-500 to-red-500',
      link: '/hotel'
    },
    {
      title: 'Movie Database',
      description: 'Movie discovery with ratings, trailers, and recommendations',
      icon: <Film className="w-6 h-6" />,
      color: 'from-indigo-500 to-purple-500',
      link: '/movies'
    },
    {
      title: 'Blog Platform',
      description: 'Modern blogging system with rich text editing and comments',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-amber-500 to-yellow-500',
      link: '/blog'
    }
  ]

  const skills = [
    { icon: <Code2 />, name: 'React/Next.js', description: 'Advanced hooks, context, state management' },
    { icon: <Palette />, name: 'UI/UX Design', description: 'Tailwind CSS, Framer Motion, responsive design' },
    { icon: <Database />, name: 'Backend Development', description: 'Node.js, Express, MongoDB, PostgreSQL' },
    { icon: <Smartphone />, name: 'Mobile Development', description: 'React Native, PWA, responsive design' },
    { icon: <Globe />, name: 'APIs & Integration', description: 'REST, GraphQL, WebSocket, third-party APIs' },
    { icon: <Shield />, name: 'Security', description: 'Authentication, authorization, data protection' },
    { icon: <Cloud />, name: 'Cloud & DevOps', description: 'AWS, Docker, CI/CD, deployment' },
    { icon: <Zap />, name: 'Performance', description: 'Optimization, caching, lazy loading' }
  ]

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12 lg:py-20"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-800/50 mb-6">
          <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            Interactive Portfolio Showcase
          </span>
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Full-Stack Developer
          </span>
          <br />
          <span className="text-gray-900 dark:text-white">Skills Showcase</span>
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
          Demonstrating advanced React skills with TypeScript through interactive, 
          production-ready application interfaces and modern UI/UX patterns.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Explore Projects
          </motion.button>
          <Link to="/stocks">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              View Live Demos
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Skills Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 w-fit mb-4">
                <div className="text-blue-600 dark:text-blue-400">
                  {skill.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {skill.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Showcase Sections */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-20"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Interactive Demos
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Explore different application types built with React & TypeScript
            </p>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-blue-600 dark:text-blue-400">
            <span>Click to explore</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {showcaseSections.map((section, index) => (
            <Link key={section.title} to={section.link}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ backgroundImage: `linear-gradient(to bottom right, ${section.color})` }}
                />
                
                <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color} w-fit mb-4`}>
                  <div className="text-white">
                    {section.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {section.description}
                </p>
                
                <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-2 transition-transform">
                  <span className="font-medium">View Demo</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl p-8 mb-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">10+</div>
            <div className="text-gray-600 dark:text-gray-400">Projects</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-400">TypeScript</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Live Updates</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">∞</div>
            <div className="text-gray-600 dark:text-gray-400">Animations</div>
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="text-center py-12"
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Ready to Build Something Amazing?
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          This showcase demonstrates the full range of modern web development skills 
          using React, TypeScript, and cutting-edge technologies.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6">
          {showcaseSections.slice(0, 3).map((section) => (
            <Link key={section.title} to={section.link}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 rounded-lg font-semibold text-white bg-gradient-to-r ${section.color} hover:shadow-lg transition-shadow`}
              >
                {section.title}
              </motion.button>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Home