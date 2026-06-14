import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { FaMoon, FaSun } from 'react-icons/fa'

const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition ${className}`}
    >
      {theme === 'light' ? <FaMoon /> : <FaSun />}
    </button>
  )
}

export default ThemeToggle
