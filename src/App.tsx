// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppProvider } from './contexts/AppContext'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import AnimatedRoutes from './components/AnimatedRoutes'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AppProvider>
          <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300">
            <Navbar />
            <Sidebar />
            <div className="ml-0 md:ml-20">
              <AnimatedRoutes />
            </div>
            <Footer />
            <ToastContainer 
              position="bottom-right"
              autoClose={3000}
              theme="colored"
            />
          </div>
        </AppProvider>
      </ThemeProvider>
    </Router>
  )
}

export default App