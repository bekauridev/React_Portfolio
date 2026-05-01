import { apiRequest } from "./client";

export const educationApi = {
  list: (query = "") => apiRequest(`/education${query}`),
  get: (id) => apiRequest(`/education/${id}`),
  create: (payload) =>
    apiRequest("/education", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/education/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/education/${id}`, { method: "DELETE" }),
};
