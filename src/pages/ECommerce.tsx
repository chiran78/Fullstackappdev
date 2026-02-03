// src/pages/ECommerce.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingCart, Heart, Star, Eye, TrendingUp } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 299.99, rating: 4.5, image: '🎧', category: 'Electronics', trending: true },
  { id: 2, name: 'Smart Watch Pro', price: 449.99, rating: 4.7, image: '⌚', category: 'Wearables', trending: true },
  { id: 3, name: 'Gaming Keyboard', price: 159.99, rating: 4.3, image: '⌨️', category: 'Gaming', trending: false },
  { id: 4, name: '4K Camera', price: 899.99, rating: 4.8, image: '📷', category: 'Photography', trending: true },
  { id: 5, name: 'Laptop Stand', price: 79.99, rating: 4.2, image: '💻', category: 'Accessories', trending: false },
  { id: 6, name: 'Wireless Mouse', price: 69.99, rating: 4.4, image: '🖱️', category: 'Electronics', trending: false },
  { id: 7, name: 'Bluetooth Speaker', price: 129.99, rating: 4.6, image: '🔊', category: 'Audio', trending: true },
  { id: 8, name: 'USB-C Hub', price: 49.99, rating: 4.1, image: '🔌', category: 'Accessories', trending: false },
]

const ECommerce: React.FC = () => {
  const { addToCart, favorites, toggleFavorite } = useApp()
  const [filter, setFilter] = useState('all')

  const filteredProducts = filter === 'all' 
    ? products 
    : filter === 'trending'
    ? products.filter(p => p.trending)
    : products.filter(p => p.category === filter)

  const categories = ['all', 'trending', ...Array.from(new Set(products.map(p => p.category)))]

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          E-commerce Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Interactive shopping experience with real-time cart updates
        </p>
      </motion.div>

      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full capitalize ${
              filter === category
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-4xl">{product.image}</div>
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                >
                  <Heart
                    className={`${
                      favorites.includes(product.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-400'
                    }`}
                    size={20}
                  />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {product.category}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    {product.rating}
                  </span>
                </div>
                {product.trending && (
                  <div className="flex items-center text-sm text-green-600 dark:text-green-400">
                    <TrendingUp size={16} className="mr-1" />
                    Trending
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    <Eye size={18} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addToCart(product)}
                    className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:opacity-90"
                  >
                    <ShoppingCart size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ECommerce