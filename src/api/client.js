export const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_V1_BASE_URL ||
  "http://localhost:8000/api/v1";

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function apiRequest(path, options = {}) {
  const hasBody = Boolean(options.body);
  const headers = {
    ...(hasBody ? { "Content-Type": "application/json" } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    ...options,
    headers,
  });

  if (response.status === 204) return null;

  const contentType = response.headers.get("content-type");
  const data = contentType?.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    if (response.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("admin:unauthorized"));
    }
    throw new ApiError(data?.message || "Request failed", response.status, data);
  }

  return data;
}
