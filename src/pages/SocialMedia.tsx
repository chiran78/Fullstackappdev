// src/pages/SocialMedia.tsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Heart, MessageCircle, Share2, Bookmark,
  MoreVertical, Send, Image, Video,
  ThumbsUp, TrendingUp, Users
} from 'lucide-react'

interface Post {
  id: number
  user: {
    name: string
    handle: string
    avatar: string
  }
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
  saved: boolean
}

const SocialMedia: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      user: { name: 'Alex Johnson', handle: '@alexj', avatar: '👨‍💻' },
      content: 'Just launched our new React component library! Built with TypeScript and Tailwind CSS. What do you think? 🚀',
      image: '🌈',
      timestamp: '2 hours ago',
      likes: 245,
      comments: 42,
      shares: 18,
      liked: false,
      saved: true
    },
    {
      id: 2,
      user: { name: 'Sarah Chen', handle: '@sarahdev', avatar: '👩‍💻' },
      content: 'Working on real-time stock tracking with WebSockets and React. The performance improvements are amazing! 📈',
      timestamp: '5 hours ago',
      likes: 189,
      comments: 31,
      shares: 12,
      liked: true,
      saved: false
    },
    {
      id: 3,
      user: { name: 'Mike Ross', handle: '@mikeross', avatar: '👨‍🎨' },
      content: 'Check out these amazing UI animations using Framer Motion! Fluid transitions make all the difference. ✨',
      image: '🎨',
      timestamp: '1 day ago',
      likes: 542,
      comments: 87,
      shares: 45,
      liked: true,
      saved: true
    },
    {
      id: 4,
      user: { name: 'Emma Wilson', handle: '@emmaw', avatar: '👩‍🔬' },
      content: 'Building a hotel booking system with React DatePicker and real-time availability. TypeScript makes it so reliable! 🏨',
      timestamp: '2 days ago',
      likes: 321,
      comments: 56,
      shares: 23,
      liked: false,
      saved: false
    }
  ])

  const [newPost, setNewPost] = useState('')
  const [trendingTopics] = useState([
    { tag: '#ReactJS', tweets: '45.2K' },
    { tag: '#TypeScript', tweets: '38.7K' },
    { tag: '#WebDevelopment', tweets: '92.1K' },
    { tag: '#UIUX', tweets: '27.4K' },
    { tag: '#OpenSource', tweets: '18.9K' }
  ])

  const [suggestedUsers] = useState([
    { name: 'React News', handle: '@reactjs', followers: '1.2M' },
    { name: 'TypeScript', handle: '@typescript', followers: '890K' },
    { name: 'Tailwind CSS', handle: '@tailwindcss', followers: '540K' },
    { name: 'Framer Motion', handle: '@framermotion', followers: '320K' }
  ])

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleSave = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ))
  }

  const handlePost = () => {
    if (!newPost.trim()) return

    const newPostObj: Post = {
      id: posts.length + 1,
      user: { name: 'You', handle: '@you', avatar: '👤' },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      saved: false
    }

    setPosts([newPostObj, ...posts])
    setNewPost('')
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
              Social Media Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Interactive social platform with real-time engagement
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-blue-500">
              <TrendingUp size={20} />
              <span className="font-semibold">Live Activity</span>
            </div>
            <div className="flex items-center space-x-2 text-pink-500">
              <Users size={20} />
              <span className="font-semibold">Active</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Create Post Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Create Post
            </h3>
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                👤
              </div>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's happening?"
                className="flex-1 min-h-[80px] p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-transparent text-gray-900 dark:text-white resize-none"
                rows={3}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex space-x-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Image size={20} className="text-blue-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <Video size={20} className="text-green-500" />
                </button>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePost}
                disabled={!newPost.trim()}
                className={`px-6 py-2 rounded-lg font-semibold ${
                  newPost.trim()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                }`}
              >
                Post
              </motion.button>
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center">
              <TrendingUp className="mr-2" size={20} />
              Trending Topics
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <motion.div
                  key={topic.tag}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                >
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {topic.tag}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {topic.tweets} posts
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl">
                        {post.user.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {post.user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {post.user.handle} · {post.timestamp}
                        </div>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                      <MoreVertical size={20} />
                    </button>
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 dark:text-gray-200 mb-4">
                    {post.content}
                  </p>

                  {/* Post Image */}
                  {post.image && (
                    <div className="mb-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl flex items-center justify-center text-6xl">
                      {post.image}
                    </div>
                  )}

                  {/* Post Stats */}
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center mr-4">
                      <ThumbsUp size={16} className="mr-1" />
                      {post.likes} likes
                    </div>
                    <div className="mr-4">{post.comments} comments</div>
                    <div>{post.shares} shares</div>
                  </div>

                  {/* Post Actions */}
                  <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.liked
                          ? 'text-red-600 bg-red-50 dark:bg-red-900/20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Heart size={20} className={post.liked ? 'fill-current' : ''} />
                      <span>Like</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <MessageCircle size={20} />
                      <span>Comment</span>
                    </button>

                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                      <Share2 size={20} />
                      <span>Share</span>
                    </button>

                    <button
                      onClick={() => handleSave(post.id)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        post.saved
                          ? 'text-blue-600 bg-blue-50 dark:bg-blue-900/20'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Bookmark size={20} className={post.saved ? 'fill-current' : ''} />
                      <span>Save</span>
                    </button>
                  </div>

                  {/* Comment Input */}
                  <div className="flex items-center space-x-3 mt-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      👤
                    </div>
                    <div className="flex-1 flex items-center border border-gray-300 dark:border-gray-600 rounded-full px-4 py-2">
                      <input
                        type="text"
                        placeholder="Write a comment..."
                        className="flex-1 bg-transparent border-none focus:outline-none text-gray-900 dark:text-white"
                      />
                      <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                        <Send size={20} className="text-blue-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Suggested Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Who to Follow
            </h3>
            <div className="space-y-4">
              {suggestedUsers.map((user, index) => (
                <motion.div
                  key={user.handle}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.handle}
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:opacity-90">
                    Follow
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Online Users */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
          >
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Online Now
            </h3>
            <div className="flex flex-wrap gap-3">
              {['👨‍💻', '👩‍🎨', '👨‍🔬', '👩‍💼', '👨‍🚀', '👩‍🍳', '👨‍🎤', '👩‍🏫'].map((emoji, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05, type: 'spring' }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl relative"
                >
                  {emoji}
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SocialMedia