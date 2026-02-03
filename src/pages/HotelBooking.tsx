// src/pages/HotelBooking.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Users, Star, MapPin, Check } from 'lucide-react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { useApp } from '../contexts/AppContext'

const hotels = [
  { id: 1, name: 'Grand Luxury Hotel', location: 'New York', rating: 4.8, price: 299, amenities: ['Pool', 'Spa', 'Gym', 'Free WiFi'], image: '🏨' },
  { id: 2, name: 'Ocean View Resort', location: 'Miami', rating: 4.6, price: 349, amenities: ['Beach', 'Spa', 'Restaurant', 'Bar'], image: '🌴' },
  { id: 3, name: 'Mountain Retreat', location: 'Aspen', rating: 4.9, price: 429, amenities: ['Skiing', 'Fireplace', 'Hot Tub', 'Sauna'], image: '🏔️' },
  { id: 4, name: 'City Center Hotel', location: 'Chicago', rating: 4.3, price: 199, amenities: ['Gym', 'Restaurant', 'Meeting Rooms', 'Bar'], image: '🏙️' },
  { id: 5, name: 'Boutique Inn', location: 'San Francisco', rating: 4.7, price: 279, amenities: ['Garden', 'Library', 'Tea Room', 'Free WiFi'], image: '🏛️' },
  { id: 6, name: 'Business Hotel', location: 'Tokyo', rating: 4.5, price: 189, amenities: ['Conference', 'Gym', 'Restaurant', 'Spa'], image: '🗼' },
]

const HotelBooking: React.FC = () => {
  const { addBooking } = useApp()
  const [checkInDate, setCheckInDate] = useState<Date | null>(new Date())
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    return date
  })
  const [guests, setGuests] = useState(2)
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null)

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const diff = checkOutDate.getTime() - checkInDate.getTime()
    return Math.ceil(diff / (1000 * 3600 * 24))
  }

  const handleBooking = (hotelId: number) => {
    const hotel = hotels.find(h => h.id === hotelId)
    if (hotel && checkInDate && checkOutDate) {
      addBooking({
        hotelName: hotel.name,
        checkIn: checkInDate.toISOString().split('T')[0],
        checkOut: checkOutDate.toISOString().split('T')[0],
        guests,
        total: hotel.price * calculateNights()
      })
      setSelectedHotel(hotelId)
      setTimeout(() => setSelectedHotel(null), 2000)
    }
  }

  return (
    <div className="pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Hotel Booking System
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Interactive booking interface with date selection and real-time pricing
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Booking Details
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline mr-2" size={18} />
                  Check-in Date
                </label>
                <DatePicker
                  selected={checkInDate}
                  onChange={setCheckInDate}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  minDate={new Date()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="inline mr-2" size={18} />
                  Check-out Date
                </label>
                <DatePicker
                  selected={checkOutDate}
                  onChange={setCheckOutDate}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  minDate={checkInDate || new Date()}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Users className="inline mr-2" size={18} />
                  Guests
                </label>
                <div className="flex items-center">
                  <button
                    onClick={() => setGuests(prev => Math.max(1, prev - 1))}
                    className="p-2 rounded-l-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={guests}
                    onChange={(e) => setGuests(Math.max(1, parseInt(e.target.value) || 1))}
                    className="flex-1 px-4 py-2 text-center bg-white dark:bg-gray-800 border-y border-gray-300 dark:border-gray-600"
                  />
                  <button
                    onClick={() => setGuests(prev => prev + 1)}
                    className="p-2 rounded-r-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Nights:</span>
                  <span className="font-semibold">{calculateNights()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total for {guests} guest{guests > 1 ? 's' : ''}:</span>
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    ${calculateNights() * 299}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hotels.map((hotel) => (
              <motion.div
                key={hotel.id}
                layout
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-4xl">{hotel.image}</div>
                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                      <Star size={16} className="mr-1 fill-current" />
                      {hotel.rating}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center text-gray-600 dark:text-gray-400 mb-4">
                    <MapPin size={16} className="mr-2" />
                    {hotel.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {hotel.amenities.map((amenity, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        ${hotel.price}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400"> / night</span>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ${hotel.price * calculateNights()} total
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleBooking(hotel.id)}
                      disabled={selectedHotel === hotel.id}
                      className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                        selectedHotel === hotel.id
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                      }`}
                    >
                      {selectedHotel === hotel.id ? (
                        <span className="flex items-center">
                          <Check className="mr-2" size={20} />
                          Booked!
                        </span>
                      ) : (
                        'Book Now'
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelBooking