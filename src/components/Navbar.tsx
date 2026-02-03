// src/components/Navbar.tsx
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sun, Moon, ShoppingCart, Heart,
  Menu, X, MessageCircle, Home, Film, TrendingUp, Hotel, BookOpen, Dice5
} from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useApp } from '../contexts/AppContext'

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme()
  const { cartItems, favorites } = useApp()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [avatarError, setAvatarError] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={18} /> },
    { path: '/social', label: 'Social', icon: <MessageCircle size={18} /> },
    { path: '/ecommerce', label: 'Shop', icon: <ShoppingCart size={18} /> },
    { path: '/movies', label: 'Movies', icon: <Film size={18} /> },
    { path: '/stocks', label: 'Stocks', icon: <TrendingUp size={18} /> },
    { path: '/hotel', label: 'Hotels', icon: <Hotel size={18} /> },
    { path: '/blog', label: 'Blog', icon: <BookOpen size={18} /> },
    { path: '/gambling', label: 'Games', icon: <Dice5 size={18} /> }
  ]

  return (
    <>
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-indigo-700 border border-transparent group-hover:border-indigo-600 transition-colors overflow-hidden">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
                    <defs>
                      <linearGradient id="navGrad" x1="0" x2="1">
                        <stop offset="0" stopColor="#6366F1" />
                        <stop offset="1" stopColor="#4F46E5" />
                      </linearGradient>
                    </defs>
                    <rect x="3" y="3" width="18" height="18" rx="4" fill="url(#navGrad)" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">SkillShowcase</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 text-sm md:text-base font-medium pb-2 transition-colors border-b-2 border-transparent ${
                    location.pathname === item.path
                      ? 'text-indigo-600 dark:text-indigo-400 border-indigo-600 dark:border-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <div className="hidden md:flex items-center space-x-3">
                <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <ShoppingCart size={18} />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartItems.length}</span>
                  )}
                </button>

                <button className="relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Heart size={18} />
                  {favorites.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{favorites.length}</span>
                  )}
                </button>

                <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
                  {!avatarError ? (
                    <img
                      src="/avatar.png"
                      alt="Avatar"
                      className="w-full h-full object-cover block"
                      onError={() => setAvatarError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sm font-medium text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800">
                      TS
                    </div>
                  )}
                </div>
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed top-16 left-0 right-0 z-40 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 md:hidden shadow-lg"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.path
                      ? 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  <span className="opacity-70">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar

// re run build