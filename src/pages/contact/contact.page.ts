export function contactPage(): HTMLElement {
  const section = document.createElement("section");
  section.className = "section";

  section.innerHTML = `
      <div class="container">
        <h2>Контакти</h2>
        <p>Напишіть нам, і ми з вами звʼяжемося</p>
        <a class="button" id="contactBtn">Написати</a>
      </div>
  `;

  return section;
}

export function initContactEvents(): void {
  const btn = document.getElementById("contactBtn");
  if (btn) {
    btn.addEventListener("click", () => {
      alert("Дякуємо! Ми звʼяжемося з вами ✨");
    });
  }
}
