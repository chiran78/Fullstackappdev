// src/pages/Blog.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Calendar, Bookmark,
  Heart, MessageCircle, Share2,
  TrendingUp, Clock, Eye, PenTool
} from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    role: string
  }
  date: string
  readTime: string
  views: number
  likes: number
  comments: number
  tags: string[]
  image: string
  featured: boolean
  liked: boolean
  saved: boolean
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: 1,
      title: 'Building Modern Web Apps with React and TypeScript',
      excerpt: 'Learn how to build scalable applications using React hooks, context, and TypeScript for type safety.',
      content: 'TypeScript has revolutionized how we build React applications...',
      author: { name: 'Alex Johnson', avatar: '👨‍💻', role: 'Senior Frontend Engineer' },
      date: '2024-01-15',
      readTime: '8 min read',
      views: 1245,
      likes: 89,
      comments: 24,
      tags: ['React', 'TypeScript', 'Frontend'],
      image: '🚀',
      featured: true,
      liked: true,
      saved: true
    },
    {
      id: 2,
      title: 'Mastering Tailwind CSS: Advanced Patterns',
      excerpt: 'Discover advanced Tailwind CSS patterns for building responsive, accessible UIs faster.',
      content: 'Tailwind CSS has changed the way we think about styling...',
      author: { name: 'Sarah Chen', avatar: '👩‍🎨', role: 'UI/UX Designer' },
      date: '2024-01-12',
      readTime: '6 min read',
      views: 892,
      likes: 67,
      comments: 18,
      tags: ['Tailwind', 'CSS', 'Design'],
      image: '🎨',
      featured: true,
      liked: false,
      saved: true
    },
    {
      id: 3,
      title: 'State Management in 2024: Beyond Redux',
      excerpt: 'Exploring modern state management solutions with React Context, Zustand, and Jotai.',
      content: 'State management has evolved significantly...',
      author: { name: 'Mike Ross', avatar: '👨‍🔬', role: 'Full Stack Developer' },
      date: '2024-01-10',
      readTime: '10 min read',
      views: 1567,
      likes: 102,
      comments: 31,
      tags: ['State Management', 'React', 'Best Practices'],
      image: '🧠',
      featured: false,
      liked: true,
      saved: false
    },
    {
      id: 4,
      title: 'The Future of Web Animation with Framer Motion',
      excerpt: 'Create stunning animations and micro-interactions using Framer Motion in React applications.',
      content: 'Animation is no longer just for decoration...',
      author: { name: 'Emma Wilson', avatar: '👩‍🏫', role: 'Motion Designer' },
      date: '2024-01-08',
      readTime: '7 min read',
      views: 723,
      likes: 54,
      comments: 12,
      tags: ['Animation', 'Framer Motion', 'UI/UX'],
      image: '✨',
      featured: false,
      liked: false,
      saved: true
    },
    {
      id: 5,
      title: 'Building Accessible React Components',
      excerpt: 'A comprehensive guide to building accessible components that work for everyone.',
      content: 'Accessibility should be a first-class citizen...',
      author: { name: 'David Lee', avatar: '👨‍💼', role: 'Accessibility Specialist' },
      date: '2024-01-05',
      readTime: '9 min read',
      views: 945,
      likes: 78,
      comments: 21,
      tags: ['Accessibility', 'React', 'Web Standards'],
      image: '♿',
      featured: false,
      liked: true,
      saved: true
    },
    {
      id: 6,
      title: 'Performance Optimization for React Apps',
      excerpt: 'Techniques to improve performance, reduce bundle size, and optimize rendering.',
      content: 'Performance is a feature that users expect...',
      author: { name: 'Lisa Wang', avatar: '👩‍🔧', role: 'Performance Engineer' },
      date: '2024-01-03',
      readTime: '11 min read',
      views: 1832,
      likes: 121,
      comments: 38,
      tags: ['Performance', 'Optimization', 'React'],
      image: '⚡',
      featured: true,
      liked: false,
      saved: false
    }
  ])

  const [selectedPost, setSelectedPost] = useState<BlogPost>(posts[0])
  const [filter, setFilter] = useState('all')
  const [newComment, setNewComment] = useState('')

  const categories = ['all', 'featured', ...Array.from(new Set(posts.flatMap(p => p.tags)))]

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
    if (selectedPost.id === postId) {
      setSelectedPost(prev => ({
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1
      }))
    }
  }

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ))
    if (selectedPost.id === postId) {
      setSelectedPost(prev => ({ ...prev, saved: !prev.saved }))
    }
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setSelectedPost(prev => ({
      ...prev,
      comments: prev.comments + 1
    }))
    setNewComment('')
  }

  const filteredPosts = filter === 'all' 
    ? posts 
    : filter === 'featured'
    ? posts.filter(p => p.featured)
    : posts.filter(p => p.tags.includes(filter))

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
              Tech Blog
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Insights, tutorials, and best practices in modern web development
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <PenTool className="text-blue-500" size={32} />
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Featured Post */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                    {selectedPost.author.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white">
                      {selectedPost.author.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedPost.author.role}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    className={`p-2 rounded-full transition-colors ${
                      selectedPost.liked
                        ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Heart size={20} className={selectedPost.liked ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={() => handleSave(selectedPost.id)}
                    className={`p-2 rounded-full transition-colors ${
                      selectedPost.saved
                        ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Bookmark size={20} className={selectedPost.saved ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold mb-3">
                  <TrendingUp size={14} className="mr-1" />
                  FEATURED
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedPost.title}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                  <span className="flex items-center">
                    <Calendar size={16} className="mr-2" />
                    {selectedPost.date}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-2" />
                    {selectedPost.readTime}
                  </span>
                  <span className="flex items-center">
                    <Eye size={16} className="mr-2" />
                    {selectedPost.views.toLocaleString()} views
                  </span>
                </div>
              </div>

              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900/50 dark:to-gray-800/50 rounded-2xl">
                <div className="text-6xl mb-4 text-center">{selectedPost.image}</div>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {selectedPost.content}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {selectedPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6 mb-6">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => handleLike(selectedPost.id)}
                    className={`flex items-center space-x-2 ${
                      selectedPost.liked ? 'text-red-600' : 'text-gray-600 dark:text-gray-400'
                    }`}
                  >
                    <Heart size={20} className={selectedPost.liked ? 'fill-current' : ''} />
                    <span>{selectedPost.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle size={20} />
                    <span>{selectedPost.comments}</span>
                  </div>
                  <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-blue-600">
                    <Share2 size={20} />
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Comment Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Add Comment
                </h4>
                <div className="flex space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                    👤
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write your comment..."
                      className="w-full min-h-[100px] p-4 border border-gray-300 dark:border-gray-600 rounded-xl bg-transparent text-gray-900 dark:text-white resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={handleAddComment}
                        disabled={!newComment.trim()}
                        className={`px-6 py-2 rounded-lg font-semibold ${
                          newComment.trim()
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Post Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Categories */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Categories
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`flex items-center justify-between w-full p-3 rounded-lg transition-colors ${
                    filter === category
                      ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 dark:text-blue-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <span className="capitalize">{category}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category === 'all' 
                      ? posts.length 
                      : category === 'featured'
                      ? posts.filter(p => p.featured).length
                      : posts.filter(p => p.tags.includes(category)).length
                    }
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Tags */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.flatMap(p => p.tags))).map((tag) => (
                <button
                  key={tag}
                  onClick={() => setFilter(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    filter === tag
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Recent Posts
            </h3>
            <div className="space-y-4">
              {posts.slice(0, 3).map((post) => (
                <motion.div
                  key={post.id}
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedPost(post)}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{post.image}</div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white line-clamp-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Latest Articles
          </h2>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {filteredPosts.length} articles
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPost(post)}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all ${
                selectedPost.id === post.id
                  ? 'ring-2 ring-blue-500'
                  : 'hover:shadow-2xl'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-4xl">{post.image}</div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleLike(post.id)
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Heart
                        size={18}
                        className={`${
                          post.liked
                            ? 'fill-red-500 text-red-500'
                            : 'text-gray-400'
                        }`}
                      />
                    </button>
                    {post.featured && (
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      {post.author.avatar}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {post.author.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {post.date}
                      </div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {post.readTime}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center">
                      <Heart size={14} className="mr-1" />
                      {post.likes}
                    </span>
                    <span className="flex items-center">
                      <MessageCircle size={14} className="mr-1" />
                      {post.comments}
                    </span>
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {post.views}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSave(post.id)
                    }}
                  >
                    <Bookmark
                      size={16}
                      className={post.saved ? 'fill-current text-blue-500' : 'text-gray-400'}
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Blog