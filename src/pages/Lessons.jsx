import React, { useEffect, useMemo, useState } from 'react'

export default function Lessons() {
  const [groups, setGroups] = useState([])
  const [lessons, setLessons] = useState([])
  const [homeworks, setHomeworks] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const [gRes, lRes, hRes] = await Promise.all([
          fetch('/api/groups/'),
          fetch('/api/lessons/'),
          fetch('/api/homework/')
        ])
        const [g, l, h] = await Promise.all([gRes.json(), lRes.json(), hRes.json()])
        setGroups(g)
        setLessons(l)
        setHomeworks(h)
        if (g.length > 0) setSelectedGroup(String(g[0].id))
      } catch {
        setGroups([])
        setLessons([])
        setHomeworks([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const weekDays = useMemo(() => {
    const start = new Date()
    const day = start.getDay() || 7
    start.setDate(start.getDate() - (day - 1))
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(start)
      d.setDate(start.getDate() + i)
      const iso = d.toISOString().slice(0, 10)
      return { key: iso, label: d.toLocaleDateString('ru-RU', { weekday: 'short', day: '2-digit', month: '2-digit' }) }
    })
  }, [])

  const filteredByGroup = useMemo(() => {
    if (!selectedGroup) return { lessons: [], homeworks: [] }
    return {
      lessons: lessons.filter(l => l.group && String(l.group.id) === selectedGroup),
      homeworks: homeworks.filter(h => h.group && String(h.group.id) === selectedGroup)
    }
  }, [lessons, homeworks, selectedGroup])

  if (loading) return <div className="page">Загрузка расписания...</div>

  return (
    <div className="page">
      <h1>Расписание недели</h1>

      <div style={{ marginBottom: '1.5rem' }}>
        <label style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
          Группа:&nbsp;
          <select
            value={selectedGroup}
            onChange={e => setSelectedGroup(e.target.value)}
            style={{
              padding: '0.35rem 0.8rem',
              borderRadius: '999px',
              border: '1px solid rgba(148,163,184,0.5)',
              background: 'rgba(15,23,42,0.9)',
              color: 'white'
            }}
          >
            {groups.map(g => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {(!filteredByGroup.lessons.length && !filteredByGroup.homeworks.length) && (
        <p>Для выбранной группы на эту неделю пока нет занятий и домашних заданий.</p>
      )}

      <div className="list-grid">
        {weekDays.map(day => {
          const dayLessons = filteredByGroup.lessons.filter(l => l.date === day.key)
          const dayHomeworks = filteredByGroup.homeworks.filter(h => h.due_date === day.key)
          if (!dayLessons.length && !dayHomeworks.length) return null

          return (
            <article key={day.key} className="card">
              <h4>{day.label}</h4>
              {dayLessons.map(l => (
                <p key={l.id}>
                  <strong>{l.start_time}–{l.end_time}</strong> · {l.subject ? l.subject.name : 'Предмет'} ·{' '}
                  {l.classroom} {l.lesson_type}
                </p>
              ))}
              {dayHomeworks.length > 0 && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.9rem' }}>
                  <strong>Домашние задания до этого дня:</strong>
                  <ul style={{ paddingLeft: '1.1rem', margin: '0.4rem 0 0' }}>
                    {dayHomeworks.map(h => (
                      <li key={h.id}>
                        {h.title} ({h.subject ? h.subject.name : 'Предмет'})
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}
