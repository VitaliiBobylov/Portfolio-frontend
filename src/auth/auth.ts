const TOKEN_KEY = "auth_token";

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

// src/auth/auth.ts
export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token"); // простий приклад
}

// повертає ID поточного користувача
export function getCurrentUserId(): string | null {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user)._id : null;
}
