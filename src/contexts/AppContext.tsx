// src/contexts/AppContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react'
import { toast } from 'react-toastify'

interface Stock {
  id: number
  symbol: string
  name: string
  price: number
  change: number
}

interface HotelBooking {
  id: number
  hotelName: string
  checkIn: string
  checkOut: string
  guests: number
  total: number
}

interface AppContextType {
  cartItems: any[]
  favorites: number[]
  bookings: HotelBooking[]
  stocks: Stock[]
  addToCart: (item: any) => void
  toggleFavorite: (id: number) => void
  addBooking: (booking: Omit<HotelBooking, 'id'>) => void
  removeBooking: (id: number) => void
  updateStockPrice: (symbol: string, newPrice: number) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5])
  const [bookings, setBookings] = useState<HotelBooking[]>([
    { id: 1, hotelName: 'Grand Hotel', checkIn: '2024-01-15', checkOut: '2024-01-20', guests: 2, total: 1200 }
  ])
  const [stocks, setStocks] = useState<Stock[]>([
    { id: 1, symbol: 'AAPL', name: 'Apple Inc.', price: 185.42, change: 1.24 },
    { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.36, change: -0.42 },
    { id: 3, symbol: 'TSLA', name: 'Tesla Inc.', price: 245.18, change: 3.15 },
    { id: 4, symbol: 'MSFT', name: 'Microsoft', price: 375.45, change: 0.86 }
  ])

  const addToCart = useCallback((item: any) => {
    setCartItems(prev => [...prev, item])
    toast.success('Added to cart!', {
      position: "bottom-right",
      autoClose: 2000,
    })
  }, [])

  const toggleFavorite = useCallback((id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }, [])

  const addBooking = useCallback((bookingData: Omit<HotelBooking, 'id'>) => {
    const newBooking = {
      ...bookingData,
      id: Date.now()
    }
    setBookings(prev => [...prev, newBooking])
    toast.success('Booking confirmed!')
  }, [])

  const removeBooking = useCallback((id: number) => {
    setBookings(prev => prev.filter(booking => booking.id !== id))
    toast.info('Booking cancelled')
  }, [])

  const updateStockPrice = useCallback((symbol: string, newPrice: number) => {
    setStocks(prev => prev.map(stock => 
      stock.symbol === symbol 
        ? { 
            ...stock, 
            price: newPrice, 
            change: Number(((newPrice - stock.price) / stock.price * 100).toFixed(2)) 
          }
        : stock
    ))
  }, [])

  return (
    <AppContext.Provider value={{
      cartItems,
      favorites,
      bookings,
      stocks,
      addToCart,
      toggleFavorite,
      addBooking,
      removeBooking,
      updateStockPrice
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}