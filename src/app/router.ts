import { homePage, portfolioPage } from "../pages/home/home.page";
import { aboutPage } from "../pages/about/about.page";
import { contactPage } from "../pages/contact/contact.page";
// import { loginPage } from "../pages/auth/login.page";     ← закоментувати або видалити
// import { registerPage } from "../pages/auth/register.page"; ← закоментувати або видалити
import { servicesPage } from "../pages/services/services";
import { isAuthenticated } from "../auth/auth";

export async function resolveRoute(): Promise<HTMLElement> {
  const hash = window.location.hash || "#home";
  const authenticated = isAuthenticated();

  switch (hash) {
    case "#home":
      return homePage();

    case "#services":
      return await servicesPage();

    case "#portfolio":
      const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
      const service = urlParams.get("service") || undefined;
      return portfolioPage(service, authenticated);

    case "#about":
      return aboutPage();

    case "#contact":
      return contactPage();

    // Опціонально: якщо хочеш залишити #login/#register як окремі сторінки для адмінів або тестів
    // case "#login":
    //   return loginPage();
    // case "#register":
    //   return registerPage();

    default:
      return homePage(); // або 404-сторінка, якщо хочеш
  }
}