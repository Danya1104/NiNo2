import React, { useEffect, useState } from 'react'

export default function Subjects() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('/api/subjects/')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  if (items === null) return <div className="page">Загрузка предметов...</div>

  return (
    <div className="page">
      <h1>Предметы</h1>
      <div className="list-grid">
        {items.length === 0 && <p>Пусто</p>}
        {items.map(s => (
          <article key={s.id} className="card">
            <h4>{s.name}</h4>
            <small>{s.code}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
