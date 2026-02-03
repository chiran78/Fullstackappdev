// src/components/Sidebar.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, Code, Palette, Database, 
  Shield, Cloud, Smartphone, Globe
} from 'lucide-react'

const skills = [
  { icon: <Code />, name: 'React.js', level: 95, color: 'from-blue-400 to-blue-600' },
  { icon: <Zap />, name: 'TypeScript', level: 90, color: 'from-blue-500 to-blue-700' },
  { icon: <Palette />, name: 'Tailwind CSS', level: 92, color: 'from-teal-400 to-teal-600' },
  { icon: <Database />, name: 'Node.js', level: 85, color: 'from-green-500 to-green-700' },
  { icon: <Shield />, name: 'Security', level: 88, color: 'from-red-400 to-red-600' },
  { icon: <Cloud />, name: 'Cloud AWS', level: 82, color: 'from-orange-400 to-orange-600' },
  { icon: <Smartphone />, name: 'React Native', level: 87, color: 'from-purple-400 to-purple-600' },
  { icon: <Globe />, name: 'GraphQL', level: 83, color: 'from-pink-500 to-pink-700' }
]

const Sidebar: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
      className="hidden md:block fixed left-0 top-16 bottom-0 w-20 hover:w-64 group transition-all duration-300 overflow-hidden bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg border-r border-gray-200 dark:border-gray-700 z-40"
    >
      <div className="h-full overflow-y-auto py-6 px-4">
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Skills Progress
          </h3>
          <div className="space-y-6">
            {skills.map((skill) => (
              <motion.div
                key={skill.name}
                className="flex items-center space-x-4"
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-br ${skill.color} text-white shadow-lg`}>
                  {skill.icon}
                </div>
                <div className="flex-1 min-w-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.name}
                    </span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ delay: 0.2, duration: 1, type: 'spring' }}
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-20 left-4 right-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-200 dark:border-gray-700"
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demonstrating advanced proficiency in {hoveredSkill} through interactive components.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  )
}

export default Sidebar