import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Проверяем, есть ли сохранённый пользователь при загрузке
  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    const resp = await fetch('/api/login/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // важно для cookie-сессий
      body: JSON.stringify({ username, password })
    })

    if (!resp.ok) {
      throw new Error('Неверный логин или пароль')
    }

    const data = await resp.json()
    const userData = {
      username: data.username,
      role: data.role,
      isAdmin: data.role === 'admin',
      isTeacher: data.role === 'teacher' || data.role === 'admin',
      isStudent: data.role === 'student'
    }
    
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return userData
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    // Можно добавить запрос на /api/logout/ если будет такой эндпоинт
  }

  const register = async (username, email, password) => {
    const resp = await fetch('/api/register/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, email, password })
    })

    if (!resp.ok) {
      const data = await resp.json()
      throw new Error(data.detail || 'Ошибка регистрации')
    }

    return await resp.json()
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

