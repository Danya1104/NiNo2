import './style.css'

async function fetchList(endpoint) {
  try {
    const res = await fetch(endpoint)
    if (!res.ok) throw new Error(res.statusText)
    return await res.json()
  } catch (e) {
    console.error('Fetch error', e)
    return null
  }
}

function renderList(container, items) {
  const el = document.getElementById(container)
  if (!el) return
  if (!items) {
    el.innerText = 'Ошибка загрузки данных.'
    return
  }
  if (items.length === 0) {
    el.innerText = 'Пусто.'
    return
  }
  el.innerHTML = items.map(item => {
    // Попытка нормализовать поля: name, title, full_name, subject
    const title = item.name || item.title || item.full_name || item.subject || item.group || 'Запись'
    const desc = item.description || item.position || item.department || item.time || ''
    return `<article class="card"><h4>${title}</h4><p>${desc}</p></article>`
  }).join('\n')
}

const cfg = window.PAGE || {}
const endpoint = cfg.endpoint || '/api/groups/'
const container = cfg.container || 'groups'

fetchList(endpoint).then(data => {
  // DRF DefaultRouter returns list of objects
  renderList(container, data)
})
