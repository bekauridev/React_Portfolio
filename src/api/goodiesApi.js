import { apiRequest } from "./client";

export const goodiesApi = {
  list: (query = "") => apiRequest(`/goodies${query}`),
  get: (id) => apiRequest(`/goodies/${id}`),
  create: (payload) =>
    apiRequest("/goodies", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/goodies/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/goodies/${id}`, { method: "DELETE" }),
};
