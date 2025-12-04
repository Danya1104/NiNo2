import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page">
      <section className="hero">
        <div className="hero__content">
          <p className="eyebrow">Образовательная платформа · 2025</p>
          <h1>Умное расписание, вдохновляющие курсы и забота о каждом студенте.</h1>
          <p className="lead">
            Выберите раздел в навигации или начните с входа в кабинет, чтобы увидеть персональные
            данные.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="section__header">
          <h2>Разделы системы</h2>
          <p>Каждый блок — отдельная страница, связанная с API бэкенда.</p>
        </div>
        <div className="features__grid">
          <article>
            <h3>Группы</h3>
            <p>Список учебных групп, с которыми работает система.</p>
            <Link to="/groups" className="link-muted">
              Открыть группы
            </Link>
          </article>
          <article>
            <h3>Предметы</h3>
            <p>Каталог дисциплин и кодов предметов.</p>
            <Link to="/subjects" className="link-muted">
              Открыть предметы
            </Link>
          </article>
          <article>
            <h3>Сотрудники</h3>
            <p>Контакты преподавателей и сотрудников.</p>
            <Link to="/staff" className="link-muted">
              Открыть сотрудников
            </Link>
          </article>
          <article>
            <h3>Расписание</h3>
            <p>Занятия по дням и группам.</p>
            <Link to="/lessons" className="link-muted">
              Открыть расписание
            </Link>
          </article>
          <article>
            <h3>Домашние задания</h3>
            <p>Актуальные задачи и дедлайны.</p>
            <Link to="/homework" className="link-muted">
              Открыть домашние
            </Link>
          </article>
        </div>
      </section>
    </div>
  )
}
