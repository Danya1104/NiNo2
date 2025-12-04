import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const userData = await login(username, password)
      
      // Перенаправляем в зависимости от роли
      if (userData.role === 'admin') {
        navigate('/admin')
      } else if (userData.role === 'teacher') {
        navigate('/')
      } else {
        navigate('/')
      }
    } catch (err) {
      setError(err.message || 'Ошибка авторизации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page--auth">
      <div className="auth-card">
        <h1>Вход в кабинет</h1>
        <p className="auth-subtitle">Используйте учётные данные, подготовленные администратором.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Логин
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="ivan.petrov"
              required
            />
          </label>

          <label>
            Пароль
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button type="submit" className="cta primary" disabled={loading}>
            {loading ? 'Входим...' : 'Войти'}
          </button>
        </form>

        <p className="auth-hint">
          Нет доступа? Обратитесь к администратору системы или преподавателю‑куратору.
        </p>
      </div>
    </div>
  )
}


