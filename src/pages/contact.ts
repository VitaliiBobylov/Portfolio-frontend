export function contactPage(): string {
  return `
      <section class="section">
        <div class="container">
          <h2>Контакти</h2>
          <p>Напишіть нам, і ми з вами звʼяжемося</p>
          <a class="button" id="contactBtn">Написати</a>
        </div>
      </section>
    `;
}

export function initContactEvents(): void {
  const btn = document.getElementById("contactBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Дякуємо! Ми звʼяжемося з вами ✨");
    });
  }
}
