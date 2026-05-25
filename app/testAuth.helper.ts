export type TestUser = {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "creator";
};

const STORAGE_KEY = "error505-test-user-id";
export const TEST_AUTH_EVENT = "error505-auth-change";

const TEST_USERS: Record<string, TestUser> = {
  admin: {
    id: "admin",
    name: "User Name",
    email: "admin",
    role: "admin",
  },
  user: {
    id: "user",
    name: "User Name",
    email: "user",
    role: "user",
  },
  creator: {
    id: "creator",
    name: "Creator Name",
    email: "creator",
    role: "creator",
  },
};

export function getTestUserById(userId?: string | null): TestUser | null {
  if (!userId) return null;
  return TEST_USERS[userId] ?? null;
}

export function getStoredTestUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_KEY);
}

export function setStoredTestUserId(userId: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, userId);
  window.dispatchEvent(new Event(TEST_AUTH_EVENT));
}

export function clearStoredTestUserId() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event(TEST_AUTH_EVENT));
}

export function loginTestUser(email: string, password: string): TestUser | null {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedPassword = password.trim();

  if (
    (normalizedEmail === "admin" || normalizedEmail === "admin@505error.com") &&
    normalizedPassword === "admin"
  ) {
    return TEST_USERS.admin;
  }

  if (
    (normalizedEmail === "user" || normalizedEmail === "user@505error.com") &&
    normalizedPassword === "user"
  ) {
    return TEST_USERS.user;
  }

  if (
    (normalizedEmail === "creator" || normalizedEmail === "creator@505error.com") &&
    normalizedPassword === "creator"
  ) {
    return TEST_USERS.creator;
  }

  return null;
}

export default function TestAuthHelperRoute() {
  return null;
}
