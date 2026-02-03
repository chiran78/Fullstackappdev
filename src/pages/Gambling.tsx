// src/pages/Gambling.tsx
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Dice5, Coins, Trophy, TrendingUp,
  Zap, Shield, Award, Crown,
  RotateCcw, Plus, Minus
} from 'lucide-react'

const Gambling: React.FC = () => {
  const [balance, setBalance] = useState(1000)
  const [betAmount, setBetAmount] = useState(10)
  const [dice, setDice] = useState([1, 1])
  const [result, setResult] = useState<string | null>(null)
  const [isRolling, setIsRolling] = useState(false)
  const [history, setHistory] = useState<Array<{ dice: number[], win: boolean, amount: number }>>([])
  const [multiplier, setMultiplier] = useState(1)
  const [autoPlay, setAutoPlay] = useState(false)
  const [streak, setStreak] = useState(0)
  const [highestWin, setHighestWin] = useState(0)

  const rollDice = () => {
    if (isRolling || balance < betAmount) return

    setIsRolling(true)
    setBalance(prev => prev - betAmount)

    // Animate dice rolling
    const rolls = Array.from({ length: 10 }, () => [
      Math.floor(Math.random() * 6) + 1,
      Math.floor(Math.random() * 6) + 1
    ])

    let currentRoll = 0
    const rollInterval = setInterval(() => {
      setDice(rolls[currentRoll])
      currentRoll++
      if (currentRoll >= rolls.length) {
        clearInterval(rollInterval)
        const finalDice = [
          Math.floor(Math.random() * 6) + 1,
          Math.floor(Math.random() * 6) + 1
        ]
        setDice(finalDice)

        const win = finalDice[0] === finalDice[1]
        const winAmount = win ? betAmount * multiplier : 0
        const newStreak = win ? streak + 1 : 0
        
        if (win) {
          setBalance(prev => prev + winAmount)
          if (winAmount > highestWin) setHighestWin(winAmount)
        }

        setResult(win ? `You won $${winAmount}!` : 'You lost!')
        setStreak(newStreak)
        setHistory(prev => [{ dice: finalDice, win, amount: winAmount }, ...prev.slice(0, 9)])
        
        setTimeout(() => setIsRolling(false), 1000)
      }
    }, 100)
  }

  useEffect(() => {
    if (autoPlay && balance >= betAmount && !isRolling) {
      const timeout = setTimeout(() => {
        rollDice()
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [autoPlay, balance, betAmount, isRolling])

  const handleBetChange = (amount: number) => {
    setBetAmount(prev => Math.max(1, Math.min(prev + amount, balance)))
  }

  const resetGame = () => {
    setBalance(1000)
    setBetAmount(10)
    setDice([1, 1])
    setResult(null)
    setHistory([])
    setStreak(0)
    setHighestWin(0)
  }

  const getDiceEmoji = (value: number) => {
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']
    return diceEmojis[value - 1]
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Dice Game
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive gambling demo with realistic mechanics (for demonstration only)
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Shield className="text-green-500" size={32} />
            <Dice5 className="text-purple-500" size={32} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Area */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border border-gray-200 dark:border-gray-700">
            {/* Balance and Controls */}
            <div className="flex flex-wrap items-center justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="bg-gradient-to-r from-yellow-500 to-amber-600 p-3 rounded-xl">
                  <Coins className="w-8 h-8 text-white" />
                </div>
                <div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Balance</div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">${balance}</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={resetGame}
                  className="flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  <RotateCcw size={18} className="mr-2" />
                  Reset
                </button>
                <button
                  onClick={() => setAutoPlay(!autoPlay)}
                  className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                    autoPlay
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                      : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90'
                  }`}
                >
                  {autoPlay ? 'Stop Auto' : 'Auto Play'}
                </button>
              </div>
            </div>

            {/* Dice Display */}
            <div className="relative mb-8">
              <div className="flex justify-center items-center space-x-8 mb-8">
                <motion.div
                  animate={isRolling ? {
                    rotate: [0, 360],
                    scale: [1, 1.15, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-28 h-28 md:w-36 md:h-36 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-6xl md:text-8xl shadow"
                >
                  {getDiceEmoji(dice[0])}
                </motion.div>
                <motion.div
                  animate={isRolling ? {
                    rotate: [0, -360],
                    scale: [1, 1.15, 1]
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className="w-28 h-28 md:w-36 md:h-36 bg-white dark:bg-gray-900 rounded-xl flex items-center justify-center text-6xl md:text-8xl shadow"
                >
                  {getDiceEmoji(dice[1])}
                </motion.div>
              </div>

              {/* Result Display */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`text-center mb-6 p-4 rounded-lg ${
                      result.includes('won')
                        ? 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700'
                        : 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700'
                    }`}
                  >
                    <div className={`text-2xl font-bold ${
                      result.includes('won') ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'
                    }`}>
                      {result}
                    </div>
                    {streak > 1 && (
                      <div className="text-yellow-500 mt-2 flex items-center justify-center">
                        <Zap size={16} className="mr-2" />
                        {streak} win streak!
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bet Controls */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6 border border-gray-100 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="text-sm text-gray-500 mb-2">Bet Amount</div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">${betAmount}</div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleBetChange(-10)}
                      disabled={betAmount <= 1}
                      className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 rounded-lg"
                    >
                      <Minus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>

                    <div className="text-lg font-semibold px-4 py-2 bg-white dark:bg-gray-900 rounded-md border border-gray-200 dark:border-gray-700">
                      ${betAmount}
                    </div>

                    <button
                      onClick={() => handleBetChange(10)}
                      disabled={betAmount >= balance}
                      className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 rounded-lg"
                    >
                      <Plus className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setBetAmount(Math.max(1, Math.floor(balance * 0.25)))}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm"
                    >
                      25%
                    </button>
                    <button
                      onClick={() => setBetAmount(Math.max(1, Math.floor(balance * 0.5)))}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm"
                    >
                      50%
                    </button>
                    <button
                      onClick={() => setBetAmount(Math.max(1, balance))}
                      className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md text-sm"
                    >
                      MAX
                    </button>
                  </div>
                </div>
              </div>

              {/* Multiplier Selection */}
              <div className="mb-8">
                <div className="text-center text-gray-500 dark:text-gray-400 mb-4">Multiplier</div>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  {[1, 2, 3, 5, 10, 20].map((mult) => (
                    <button
                      key={mult}
                      onClick={() => setMultiplier(mult)}
                      className={`p-3 rounded-lg transition-all ${
                        multiplier === mult
                          ? 'bg-indigo-600 text-white transform scale-105 shadow'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <div className="text-lg font-bold">x{mult}</div>
                      <div className="text-xs opacity-80">
                        Win: ${betAmount * mult}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Roll Button */}
              <div className="text-center">
                <motion.button
                  whileHover={!isRolling && balance >= betAmount ? { scale: 1.03 } : {}}
                  whileTap={!isRolling && balance >= betAmount ? { scale: 0.98 } : {}}
                  onClick={rollDice}
                  disabled={isRolling || balance < betAmount}
                  className={`px-12 py-3 text-lg rounded-xl font-semibold transition-all ${
                    isRolling || balance < betAmount
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20'
                  }`}
                >
                  {isRolling ? (
                    <span className="flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Dice5 className="w-5 h-5 mr-2" />
                      </motion.div>
                      Rolling...
                    </span>
                  ) : balance < betAmount ? (
                    'Insufficient Balance'
                  ) : (
                    <span className="flex items-center justify-center">
                      <Dice5 className="w-5 h-5 mr-2" />
                      Roll Dice (x{multiplier})
                    </span>
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and History */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <Trophy className="mr-2 text-yellow-500" />
              Game Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <TrendingUp className="mr-3 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Current Streak</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {streak}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <Coins className="mr-3 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Highest Win</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  ${highestWin}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <Award className="mr-3 text-purple-500" />
                  <span className="text-gray-700 dark:text-gray-300">Total Bets</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {history.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                <div className="flex items-center">
                  <Crown className="mr-3 text-amber-500" />
                  <span className="text-gray-700 dark:text-gray-300">Win Rate</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {history.length > 0
                    ? `${Math.round((history.filter(h => h.win).length / history.length) * 100)}%`
                    : '0%'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* History */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Rolls
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {history.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No rolls yet
                </div>
              ) : (
                history.map((roll, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {getDiceEmoji(roll.dice[0])} {getDiceEmoji(roll.dice[1])}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {roll.dice[0]} & {roll.dice[1]}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {roll.win ? 'Win' : 'Loss'}
                        </div>
                      </div>
                    </div>
                    <div className={`font-bold ${
                      roll.win ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {roll.win ? '+' : '-'}${Math.abs(roll.amount)}
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-2xl p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-red-500 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">
                  Important Notice
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This is a demonstration only. No real money is involved. 
                  Gambling can be addictive and harmful. Play responsibly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gambling