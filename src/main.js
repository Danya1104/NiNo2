import './style.css'

const deerIllustration = `
  <svg viewBox="0 0 320 320" role="img" aria-label="Олень" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="deerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#a5d8ff" />
        <stop offset="100%" stop-color="#3b82f6" />
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="8" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <rect width="320" height="320" rx="30" fill="url(#deerGradient)" opacity="0.15"></rect>
    <path
      d="M110 180c-22-10-38-38-31-60 4-12 14-20 25-22 9-1 18 2 26 7 15 10 25 27 34 43 7-15 16-30 30-40s34-12 45 0c18 18 4 64-24 74 11 2 25 12 28 24s-6 26-18 30-24-3-34-10c-8-6-15-13-21-22-10 10-23 19-37 23s-31-1-36-13c-3-7 0-15 6-20 6-4 14-5 21-4-9-3-16-6-24-10z"
      fill="none"
      stroke="#f8fbff"
      stroke-width="6"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
    <path
      d="M150 210c-5 18-6 37-3 56"
      stroke="#d1e9ff"
      stroke-width="5"
      stroke-linecap="round"
      filter="url(#glow)"
      fill="none"
    ></path>
    <circle cx="220" cy="105" r="6" fill="#dbeafe"></circle>
    <circle cx="108" cy="110" r="6" fill="#dbeafe"></circle>
    <circle cx="240" cy="210" r="4" fill="#dbeafe" opacity="0.6"></circle>
    <circle cx="90" cy="210" r="4" fill="#dbeafe" opacity="0.6"></circle>
  </svg>
`

document.querySelector('#app').innerHTML = `
  <div class="page">
    <header class="hero">
      <nav class="nav">
        <div class="logo">NiNo<span>Next</span></div>
        <div class="nav__links">
          <a href="#benefits">Преимущества</a>
          <a href="#schedule">Расписание</a>
          <a href="#team">Команда</a>
        </div>
        <button class="cta secondary">Войти</button>
      </nav>
      <div class="hero__grid">
        <div class="hero__content">
          <p class="eyebrow">Образовательная платформа · 2025</p>
          <h1>Умное расписание, вдохновляющие курсы и забота о каждом студенте.</h1>
          <p class="lead">
            Ни один дедлайн не пройдёт мимо: персональные напоминания, прозрачная коммуникация со
            школой и динамические дашборды в едином месте.
          </p>
          <div class="hero__cta">
            <button class="cta primary">Создать пространство</button>
            <button class="cta ghost">Посмотреть демо</button>
          </div>
          <div class="hero__stats">
            <div>
              <span>12 400+</span>
              <p>Активных студентов</p>
            </div>
            <div>
              <span>98%</span>
              <p>Своевременных сдач</p>
            </div>
            <div>
              <span>24/7</span>
              <p>Поддержка кураторов</p>
            </div>
          </div>
        </div>
        <div class="hero__visual">
          <div class="halo"></div>
          <div class="deer-card">
            ${deerIllustration}
            <div class="deer-card__badge">
              <span>AI-хаб</span>
              <p>Олень-берегиня подскажет, как прожить неделю без перегрузок.</p>
            </div>
          </div>
          <div class="floating-card">
            <p>Сегодня</p>
            <h4>Дизайн мышление · 12:10</h4>
            <div class="chips">
              <span>В аудитории</span>
              <span>Семинар</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <section id="benefits" class="section features">
        <div class="section__header">
          <p class="eyebrow">Преимущества</p>
          <h2>Живой интерфейс с акцентом в голубом для спокойной концентрации.</h2>
          <p>Мы отталкивались от трендов 2025: мягкие градиенты, стеклянные карточки и микроанимация.</p>
        </div>
        <div class="features__grid">
          <article>
            <h3>Гибкое ядро</h3>
            <p>Персональные расписания строятся на основе привычек пользователя и синхронизируются с календарями.</p>
          </article>
          <article>
            <h3>Голубой акцент</h3>
            <p>Цветовая палитра помогает глазам отдохнуть и выделяет главное без агрессивных контрастов.</p>
          </article>
          <article>
            <h3>Олень-наставник</h3>
            <p>Фирменный персонаж мягко напоминает о задачах и добавляет бренду характера.</p>
          </article>
          <article>
            <h3>Коллаборативность</h3>
            <p>Совместное планирование, быстрые реакции преподавателей и безопасный обмен файлами.</p>
          </article>
        </div>
      </section>

      <section id="schedule" class="section glass-panel">
        <div class="panel__content">
          <p class="eyebrow">Превью расписания</p>
          <h2>Виджет недели в одном взгляде.</h2>
          <p>Смешиваем карточный вид и диаграммы нагрузки, чтобы студент чувствовал себя уверенно.</p>
          <ul class="timeline">
            <li>
              <span>09:00</span>
              <div>
                <strong>Инженерная графика</strong>
                <p>Фокус на синхронные проектные сессии.</p>
              </div>
            </li>
            <li>
              <span>12:10</span>
              <div>
                <strong>Дизайн мышление</strong>
                <p>Командный воркшоп в гибридном формате.</p>
              </div>
            </li>
            <li>
              <span>15:40</span>
              <div>
                <strong>Аналитика данных</strong>
                <p>Асинхронная лекция + интерактивные квизы.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="panel__stats">
          <div class="stat-card">
            <p>Нагрузка</p>
            <h3>6ч 20м</h3>
            <small>Среднее время фокуса</small>
          </div>
          <div class="stat-card">
            <p>Баланс</p>
            <h3>87%</h3>
            <small>Рекомендованная равновесность</small>
          </div>
          <div class="stat-card highlight">
            <p>Настроение</p>
            <h3>calm+</h3>
            <small>AI-оценка по смарт-трекеру</small>
          </div>
        </div>
      </section>

      <section id="team" class="section callout">
        <div>
          <p class="eyebrow">Команда сопровождения</p>
          <h2>Наставники остаются на связи 24/7.</h2>
          <p>
            Мы помогли десяткам кампусов внедрить цифровую культуру без стресса. Готовы собрать пилот за
            две недели.
          </p>
        </div>
        <div class="callout__actions">
          <button class="cta primary">Назначить созвон</button>
          <button class="cta ghost">Скачать гайд</button>
        </div>
      </section>
    </main>
  </div>
`
