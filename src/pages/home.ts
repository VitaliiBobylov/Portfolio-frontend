export function homePage(): string {
  return `
      <section class="section" style="background:#f7f9fc;">
        <div class="container" style="text-align:center;">
          <img src="https://scontent-iev1-1.xx.fbcdn.net/v/t1.6435-9/36670159_515426672220347_5083859097858605056_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=110&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=eqqP8VxqzAkQ7kNvwFGkPp4&_nc_oc=Adly8cwVX-BXvsDfRINAhdbakHeBS-JKnC8NN4U6o39yn-QpJG9gTeRnFnl0TEv9Wbk&_nc_zt=23&_nc_ht=scontent-iev1-1.xx&_nc_gid=wccHGRomoPTN5Vx8qed3GQ&oh=00_AfncFonzFDlSxw8u6HpqUGYU399qbqpi55gkqT-0TBbe6g&oe=6971B8F0"
            alt="Фото Віталія"
            style="width:150px; height:150px; border-radius:50%; margin-bottom:20px;" />
  
          <h2>Бобильов Віталій</h2>
          <h3>Резюме</h3>
  
          <div class="cards">
            <div class="card">
              <h3>Освіта</h3>
              <p>
                <span class="edu-title">ITSchool GoIT</span><br>
                <span class="edu-desc">Fullstack-розробник</span><br>
                <span class="edu-year">2024 – 2025</span><br>
  
                <span class="edu-title">Старобільський технікум Луганського національного аграрного університету</span><br>
                <span class="edu-desc">Середня спеціальна агрономія</span><br>
                <span class="edu-year">2005 – 2009</span>
              </p>
            </div>
  
            <div class="card">
              <h3>Досвід роботи</h3>
              <h4>Fullstack розробник — ITSchool GoIT</h4>
              <span class="job-period">2024 – 2025</span>
              <p>Розробка веб-додатків, участь у командних проектах, створення REST API та інтеграцій з базами даних.</p>
            </div>
  
            <div class="card">
              <h3>Навички</h3>
              <p>
                HTML/CSS<br>
                JavaScript<br>
                Node.js<br>
                Web-дизайн<br>
                Vite<br>
                Git<br>
                Trello<br>
                Parcel<br>
                MongoDB<br>
                API<br>
                TypeScript<br>
                Vercel<br>
                Next.js (App Router)<br>
                Робота з бібліотеками<br>
                Вирішення проблем<br>
                Технічна освіта<br>
                Проектне мислення
              </p>
            </div>
  
            <div class="card">
              <h3>Контакти</h3>
              <p class="contacts">
                <span class="label">Телефон:</span><br>
                <a href="tel:+380932324038">+38 (093) 23-24-038</a><br>
  
                <span class="label">Email:</span><br>
                <a href="mailto:vitaliibobylov@gmail.com">vitaliibobylov@gmail.com</a><br>
  
                <span class="label">GitHub:</span><br>
                <a href="https://github.com/VitaliiBobylov" target="_blank">Bobylov_Vitalii</a><br>
  
                <span class="label">LinkedIn:</span><br>
                <a href="https://linkedin.com/in/vitalii-bobylov" target="_blank">linkedin.com/in/vitalii-bobylov</a><br>
  
                <span class="label">Місто:</span><br>
                <a href="https://www.google.com/maps/place/Київ" target="_blank">Київ, Україна</a>
              </p>
  
              <div class="contact-icons">
                <a href="https://t.me/Bobylov_Vitalii" target="_blank" aria-label="Telegram">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png" alt="Telegram">
                </a>
                <a href="https://www.facebook.com/vitos.bobylev?locale=ru_RU" target="_blank" aria-label="Facebook">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2023_Facebook_icon.svg/2048px-2023_Facebook_icon.svg.png" alt="Facebook">
                </a>
                <a href="viber://chat?number=%2B380932324038" aria-label="Viber">
                  <img src="https://www.svgrepo.com/show/110209/viber.svg" alt="Viber">
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
}
