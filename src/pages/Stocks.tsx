// src/pages/Stocks.tsx
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, BarChart3, RefreshCw } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Stocks: React.FC = () => {
  const { stocks, updateStockPrice } = useApp()
  const [selectedStock, setSelectedStock] = useState(stocks[0])
  const [timeRange, setTimeRange] = useState('1D')
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    generateChartData()
    const interval = setInterval(() => {
      const randomStock = stocks[Math.floor(Math.random() * stocks.length)]
      const change = (Math.random() - 0.5) * 10
      updateStockPrice(randomStock.symbol, randomStock.price + change)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const generateChartData = () => {
    const data = []
    let price = selectedStock.price
    for (let i = 0; i < 20; i++) {
      price += (Math.random() - 0.5) * 10
      data.push({
        time: `${i}:00`,
        price: Math.max(price, 0)
      })
    }
    setChartData(data)
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Stock Market Tracker
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Real-time stock prices with interactive charts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="text-green-500" size={24} />
            <BarChart3 className="text-blue-500" size={24} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedStock.name} ({selectedStock.symbol})
                </h2>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white mr-3">
                    ${selectedStock.price.toFixed(2)}
                  </span>
                  <span className={`flex items-center text-lg font-semibold ${
                    selectedStock.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {selectedStock.change >= 0 ? (
                      <TrendingUp size={20} className="mr-1" />
                    ) : (
                      <TrendingDown size={20} className="mr-1" />
                    )}
                    {Math.abs(selectedStock.change)}%
                  </span>
                </div>
              </div>
              <div className="flex space-x-2">
                {['1D', '1W', '1M', '1Y'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-2 rounded-lg ${
                      timeRange === range
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      border: 'none',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke={selectedStock.change >= 0 ? '#10B981' : '#EF4444'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Watchlist
              </h3>
              <button
                onClick={generateChartData}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <RefreshCw size={18} />
              </button>
            </div>
            <div className="space-y-4">
              {stocks.map((stock) => (
                <motion.div
                  key={stock.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedStock(stock)}
                  className={`p-4 rounded-xl cursor-pointer transition-colors ${
                    selectedStock.id === stock.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {stock.symbol}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {stock.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900 dark:text-white">
                        ${stock.price.toFixed(2)}
                      </div>
                      <div className={`flex items-center justify-end text-sm ${
                        stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.change >= 0 ? (
                          <TrendingUp size={16} className="mr-1" />
                        ) : (
                          <TrendingDown size={16} className="mr-1" />
                        )}
                        {Math.abs(stock.change)}%
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Stocks