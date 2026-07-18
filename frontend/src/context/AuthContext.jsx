import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as userApi from '../services/user.api.js'

const AuthContext = createContext(null)

const readStorage = () => {
  try {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return {
      token,
      user: user ? JSON.parse(user) : null,
    }
  } catch {
    return { token: null, user: null }
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => readStorage().user)
  const [token, setToken] = useState(() => readStorage().token)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = async (credentials) => {
    const response = await userApi.login(credentials)
    setToken(response.token)
    setUser(response.user)
    return response.user
  }

  const register = async (userData) => {
    const response = await userApi.register(userData)
    setToken(response.token)
    setUser(response.user)
    return response.user
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, token, loading, login, register, logout }),
    [user, token, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
