import API from "./api";
// import { clearLocalCart } from "./cartApi";

const getQueryParam = (key: string): string | null => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  return params.get(key);
};

export type SignupUserType = "reader" | "creator";

export const normalizeSignupUserType = (value?: string | null): SignupUserType =>
  value === "creator" ? "creator" : "reader";

export const clearAuthStorage = (notify = true) => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("token");
  localStorage.removeItem("user");
  // clearLocalCart();
  delete API.defaults.headers.common.Authorization;

  if (notify) {
    window.dispatchEvent(new CustomEvent("auth-change"));
  }
};

const storeAuthPayload = (payload: any) => {
  const data = payload?.data ?? payload;
  const token = data?.token || data?.access_token || data?.authorisation?.token;
  const user = data?.user || data?.profile || data?.account || null;

  if (typeof window !== "undefined") {
    clearAuthStorage(false);

    if (token) {
      localStorage.setItem("token", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (token && user) {
      localStorage.setItem("user", JSON.stringify(user));
    }

    window.dispatchEvent(new CustomEvent("auth-change"));
  }

  return { token, user, data };
};

export const sendVerificationEmail = async (email: string) => {
  console.warn("No resend verification endpoint is defined in Postman.", email);
};

export const login = async (payload: any) => {
  try {
    clearAuthStorage(false);

    const form = new FormData();
    form.append("email", payload.email);
    form.append("password", payload.password);

    const res = await API.post("auth/login", form);

    const data = res.data;
    const msg = String(data?.message || "").toLowerCase();
    
    // ONLY trigger inactive flow if message explicitly says so
    if (msg.includes("inactive") || msg.includes("verify")) {
      await sendVerificationEmail(payload.email);
      const err: any = new Error("Account is inactive.");
      err.isInactive = true;
      throw err;
    }

    return storeAuthPayload(data);
  } catch (error: any) {
    if (error?.isInactive) throw error;

    const data = error?.response?.data;
    const msg = String(data?.message || "").toLowerCase();

    if (msg.includes("inactive") || msg.includes("verify")) {
      await sendVerificationEmail(payload.email);
      const err: any = new Error("Account is inactive.");
      err.isInactive = true;
      throw err;
    }

    throw error;
  }
};

export const register = async (userData: any) => {
  const userType = normalizeSignupUserType(userData.type || getQueryParam("user_type"));
  try {
    clearAuthStorage();

    const form = new FormData();
    form.append("first_name", userData.firstName);
    form.append("last_name", userData.lastName);
    form.append("name", `${userData.firstName} ${userData.lastName}`.trim());
    form.append("email", userData.email);
    form.append("password", userData.password);
    form.append("password_confirmation", userData.confirmPassword);
    form.append("type", userType);

    const res = await API.post("auth/register", form);

    return res.data;
  } catch (error: any) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  const normalizedEmail = email.toLowerCase().trim();
  const form = new FormData();
  form.append("email", normalizedEmail);

  const res = await API.post("auth/forgot-password", form);
  return res.data as { status: boolean; message: string; data: { email: string } };
};

export const resetPassword = async ({
  email,
  token,
  password,
  confirmPassword,
}: {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}) => {
  const res = await API.post("auth/reset-password", {
    email,
    token,
    password,
    password_confirmation: confirmPassword,
  });
  return res.data as { status: boolean; message: string };
};

export const verifyEmailCode = async (email: string, code: string) => {
  const form = new FormData();
  form.append("email", email.toLowerCase().trim());
  form.append("verification_code", code.trim());

  const res = await API.post("auth/verify-email", form);

  return storeAuthPayload(res.data);
};

export const logout = async () => {
  await API.post("auth/logout").catch(() => null);
  clearAuthStorage();
};
