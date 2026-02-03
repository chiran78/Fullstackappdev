import React from 'react'

const Footer: React.FC = () => {
  return (
    <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Frontend Demo. All rights reserved.
    </footer>
  )
}

export default Footer
