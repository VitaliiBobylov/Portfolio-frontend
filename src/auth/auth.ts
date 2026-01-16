// src/auth/auth.ts
const TOKEN_KEY = "auth_token";

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("user"); // якщо зберігаєш ще й user-об'єкт
}

export function isAuthenticated(): boolean {
  return !!getToken(); // тепер використовує ту саму константу — ідеально
}

// повертає ID поточного користувача (якщо потрібно)
export function getCurrentUserId(): string | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user)?._id : null;
}