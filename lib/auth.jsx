'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const DEMO_USER = { name: 'Amit Verma', lastLogin: '25/07/2026' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('ipru_user')
    if (stored) setUser(JSON.parse(stored))
    setReady(true)
  }, [])

  const login = () => {
    setUser(DEMO_USER)
    localStorage.setItem('ipru_user', JSON.stringify(DEMO_USER))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('ipru_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, ready }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
