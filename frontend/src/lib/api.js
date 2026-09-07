import axios from "axios";

export const API = `${import.meta.env.VITE_BACKEND_URL || ""}/api`;

const api = axios.create({ baseURL: API });

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export function apiErr(e) {
  const detail = e?.response?.data?.detail;
  if (detail == null) return e?.message || "حدث خطأ، حاول مرة أخرى";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail))
    return detail.map((x) => (x && typeof x.msg === "string" ? x.msg : JSON.stringify(x))).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export default api;
