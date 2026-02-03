// src/pages/Movies.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Play, Star, Heart, Clock,
  TrendingUp, Filter, Calendar,
  ThumbsUp, Film
} from 'lucide-react'

interface Movie {
  id: number
  title: string
  year: number
  rating: number
  duration: string
  genre: string[]
  description: string
  director: string
  cast: string[]
  image: string
  featured: boolean
}

const Movies: React.FC = () => {
  const [movies] = useState<Movie[]>([
    {
      id: 1,
      title: 'Quantum Dreams',
      year: 2024,
      rating: 8.7,
      duration: '2h 28m',
      genre: ['Sci-Fi', 'Thriller'],
      description: 'A mind-bending journey through parallel universes where choices create infinite realities.',
      director: 'Alex Rivera',
      cast: ['Emma Stone', 'Michael B. Jordan', 'Zendaya'],
      image: '🌌',
      featured: true
    },
    {
      id: 2,
      title: 'Neon Nights',
      year: 2023,
      rating: 7.9,
      duration: '1h 52m',
      genre: ['Action', 'Cyberpunk'],
      description: 'In a dystopian future, a rogue AI threatens humanity while a hacker tries to save it.',
      director: 'Lisa Chang',
      cast: ['Keanu Reeves', 'Ana de Armas', 'John Boyega'],
      image: '🌃',
      featured: true
    },
    {
      id: 3,
      title: 'Echoes of Time',
      year: 2024,
      rating: 8.2,
      duration: '2h 15m',
      genre: ['Drama', 'Mystery'],
      description: 'A historian discovers she can communicate with the past, changing history forever.',
      director: 'James Wilson',
      cast: ['Florence Pugh', 'Oscar Isaac', 'Viola Davis'],
      image: '⏳',
      featured: false
    },
    {
      id: 4,
      title: 'Arctic Survival',
      year: 2023,
      rating: 7.5,
      duration: '1h 48m',
      genre: ['Adventure', 'Survival'],
      description: 'A team of scientists must survive in the Arctic when their research station collapses.',
      director: 'Sarah Johnson',
      cast: ['Jason Momoa', 'Rebecca Ferguson', 'Javier Bardem'],
      image: '🏔️',
      featured: false
    },
    {
      id: 5,
      title: 'Digital Ghost',
      year: 2024,
      rating: 8.4,
      duration: '2h 5m',
      genre: ['Horror', 'Tech'],
      description: 'A viral AI meme becomes sentient and haunts social media users worldwide.',
      director: 'Mike Chen',
      cast: ['Daniel Kaluuya', 'Lupita Nyong\'o', 'Steven Yeun'],
      image: '👻',
      featured: true
    },
    {
      id: 6,
      title: 'Renaissance Heist',
      year: 2023,
      rating: 7.8,
      duration: '2h 12m',
      genre: ['Crime', 'Historical'],
      description: 'A team of thieves plans the ultimate heist during the Italian Renaissance.',
      director: 'Marco Rossi',
      cast: ['Ryan Gosling', 'Margot Robbie', 'Brad Pitt'],
      image: '🎨',
      featured: false
    }
  ])

  const [selectedMovie, setSelectedMovie] = useState<Movie>(movies[0])
  const [filter, setFilter] = useState('all')
  const [favorites, setFavorites] = useState<number[]>([1, 3])

  const genres = ['all', 'featured', ...Array.from(new Set(movies.flatMap(m => m.genre)))]

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    )
  }

  const filteredMovies = filter === 'all' 
    ? movies 
    : filter === 'featured'
    ? movies.filter(m => m.featured)
    : movies.filter(m => m.genre.includes(filter))

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
              Movie Database
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Discover, rate, and watch trailers of the latest movies
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Film className="text-purple-500" size={32} />
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Movie */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-gradient-to-br from-purple-900/30 to-blue-900/30 rounded-3xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold mb-3">
                    <Star size={14} className="mr-1 fill-current" />
                    FEATURED
                  </div>
                  <h2 className="text-4xl font-bold text-white mb-2">
                    {selectedMovie.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-white/80 mb-4">
                    <span>{selectedMovie.year}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      {selectedMovie.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Star size={16} className="mr-1 fill-current text-yellow-400" />
                      {selectedMovie.rating}/10
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(selectedMovie.id)}
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Heart
                    size={24}
                    className={`${
                      favorites.includes(selectedMovie.id)
                        ? 'fill-red-500 text-red-500'
                        : 'text-white'
                    }`}
                  />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-white/90 mb-4">
                    {selectedMovie.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selectedMovie.genre.map((g) => (
                      <span
                        key={g}
                        className="px-3 py-1 rounded-full bg-white/10 text-white text-sm"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-black/20 rounded-2xl p-4">
                  <div className="mb-4">
                    <h4 className="text-white font-semibold mb-2">Director</h4>
                    <p className="text-white/80">{selectedMovie.director}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-2">Cast</h4>
                    <p className="text-white/80">{selectedMovie.cast.join(', ')}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold"
                >
                  <Play size={20} className="mr-2" />
                  Watch Trailer
                </motion.button>
                <button className="px-6 py-3 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors">
                  More Info
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters and Stats */}
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Filter size={20} className="mr-2 text-gray-600 dark:text-gray-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Filters
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setFilter(genre)}
                  className={`px-4 py-2 rounded-full capitalize transition-colors ${
                    filter === genre
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Movie Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                <div className="flex items-center">
                  <Film size={20} className="mr-3 text-blue-500" />
                  <span className="text-gray-700 dark:text-gray-300">Total Movies</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {movies.length}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10">
                <div className="flex items-center">
                  <Star size={20} className="mr-3 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Avg Rating</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {(movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-pink-500/10 to-rose-500/10">
                <div className="flex items-center">
                  <Heart size={20} className="mr-3 text-pink-500" />
                  <span className="text-gray-700 dark:text-gray-300">Favorites</span>
                </div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">
                  {favorites.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {filter === 'all' ? 'All Movies' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </h2>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Calendar size={16} className="mr-2" />
            Updated daily
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedMovie(movie)}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all ${
                selectedMovie.id === movie.id
                  ? 'ring-2 ring-purple-500'
                  : 'hover:shadow-2xl'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{movie.image}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(movie.id)
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Heart
                        size={20}
                        className={`${
                          favorites.includes(movie.id)
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                    {movie.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {movie.title}
                </h3>
                <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{movie.year}</span>
                  <span>•</span>
                  <span>{movie.duration}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Star size={14} className="mr-1 fill-current text-yellow-500" />
                    {movie.rating}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {movie.genre.map((g) => (
                    <span
                      key={g}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {movie.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      <Play size={18} className="text-purple-500" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      <ThumbsUp size={18} className="text-blue-500" />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Directed by {movie.director.split(' ')[0]}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Movies