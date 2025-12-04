import React from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Home from './pages/Home'
import Groups from './pages/Groups'
import Subjects from './pages/Subjects'
import Staff from './pages/Staff'
import Lessons from './pages/Lessons'
import Homework from './pages/Homework'
import Login from './pages/Login'
import Register from './pages/Register'

function NavBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="site-header">
      <nav className="nav">
        <Link className="logo" to="/">
          NiNo<span>Next</span>
        </Link>
        <div className="nav__links">
          <Link to="/groups">Группы</Link>
          <Link to="/subjects">Предметы</Link>
          <Link to="/staff">Сотрудники</Link>
          <Link to="/lessons">Расписание</Link>
          <Link to="/homework">Домашние</Link>
          {user?.isAdmin && (
            <a href="http://127.0.0.1:8000/admin/" target="_blank" rel="noopener noreferrer" className="nav-admin-link">
              Админка
            </a>
          )}
        </div>
        <div className="nav__auth">
          {user ? (
            <>
              <span className="nav-user">
                {user.username} ({user.role === 'admin' ? 'Админ' : user.role === 'teacher' ? 'Учитель' : 'Ученик'})
              </span>
              <button onClick={handleLogout} className="nav-login nav-login--ghost">
                Выход
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-login">
                Вход
              </Link>
              <Link to="/register" className="nav-login nav-login--ghost">
                Регистрация
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default function App() {
  return (
    <div className="app-shell">
      <NavBar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/homework" element={<Homework />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}
