// src/components/AnimatedRoutes.tsx
import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from '../pages/Home.tsx'
import SocialMedia from '../pages/SocialMedia.tsx'
import ECommerce from '../pages/ECommerce.tsx'
import Movies from '../pages/Movies.tsx'
import Stocks from '../pages/Stocks.tsx'
import HotelBooking from '../pages/HotelBooking.tsx'
import Blog from '../pages/Blog.tsx'
import Gambling from '../pages/Gambling.tsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const AnimatedRoutes: React.FC = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/social" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <SocialMedia />
          </motion.div>
        } />
        <Route path="/ecommerce" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <ECommerce />
          </motion.div>
        } />
        <Route path="/movies" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Movies />
          </motion.div>
        } />
        <Route path="/stocks" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Stocks />
          </motion.div>
        } />
        <Route path="/hotel" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <HotelBooking />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Blog />
          </motion.div>
        } />
        <Route path="/gambling" element={
          <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <Gambling />
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes