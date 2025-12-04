import React, { useEffect, useState } from 'react'

export default function Staff() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('/api/staff/')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  if (items === null) return <div className="page">Загрузка сотрудников...</div>

  return (
    <div className="page">
      <h1>Сотрудники</h1>
      <div className="list-grid">
        {items.length === 0 && <p>Пусто</p>}
        {items.map(s => (
          <article key={s.id} className="card">
            <h4>{s.full_name}</h4>
            <p>{s.position} — {s.department}</p>
            <small>{s.work_email}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
