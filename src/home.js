import './style.css'
import { shortDescription } from './main.js'

const app = document.getElementById('app')

app.innerHTML = `
  <div class="page">
    <header class="hero">
      <div class="hero__grid">
        <div class="hero__content">
          <p class="eyebrow">Образовательная платформа · 2025</p>
          <h1>${shortDescription()}</h1>
          <p class="lead">Ни один дедлайн не пройдёт мимо: персональные напоминания и динамические дашборды.</p>
          <div class="hero__cta">
            <a class="cta primary" href="/groups.html">Посмотреть группы</a>
            <a class="cta ghost" href="/lessons.html">Расписание</a>
          </div>
        </div>
        <div class="hero__visual">
          <p style="opacity:.85">Добро пожаловать в NiNo — выберите страницу выше.</p>
        </div>
      </div>
    </header>
    <main>
      <section class="section features">
        <div class="features__grid">
          <article>
            <h3>Гибкое ядро</h3>
            <p>Персональные расписания строятся на основе привычек пользователя.</p>
          </article>
          <article>
            <h3>Коллаборативность</h3>
            <p>Совместное планирование и быстрые реакции преподавателей.</p>
          </article>
        </div>
      </section>
    </main>
  </div>
`
