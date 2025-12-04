import React, { useEffect, useState } from 'react'

export default function Groups() {
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch('/api/groups/')
      .then(r => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  if (items === null) return <div className="page">Загрузка групп...</div>

  return (
    <div className="page">
      <h1>Группы</h1>
      <div className="list-grid">
        {items.length === 0 && <p>Пусто</p>}
        {items.map(g => (
          <article key={g.id} className="card">
            <h4>{g.name}</h4>
          </article>
        ))}
      </div>
    </div>
  )
}
