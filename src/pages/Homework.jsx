import React, { useEffect, useState } from 'react'

export default function Homework() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('/api/homework/')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  if (items === null) return <div className="page">Загрузка домашних заданий...</div>

  return (
    <div className="page">
      <h1>Домашние задания</h1>
      <div className="list-grid">
        {items.length === 0 && <p>Пусто</p>}
        {items.map(h => (
          <article key={h.id} className="card">
            <h4>{h.title}</h4>
            <p>{h.description}</p>
            <small>Срок: {h.due_date}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
