import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await register(username, email, password)
      setSuccess('Аккаунт создан! Перенаправляем на страницу входа...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.message || 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page page--auth">
      <div className="auth-card">
        <h1>Регистрация ученика</h1>
        <p className="auth-subtitle">Создайте учётную запись для просмотра личного расписания.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Логин
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Пароль
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}

          <button type="submit" className="cta primary" disabled={loading}>
            {loading ? 'Регистрируем...' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  )
}


