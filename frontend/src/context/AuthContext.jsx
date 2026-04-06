import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      api.setToken(token)
      // opcional: fetch user
    }
  }, [token])

  function login(token) {
    setToken(token)
    localStorage.setItem('token', token)
    api.setToken(token)
  }

  function logout() {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
    api.setToken(null)
  }

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
