import { apiRequest } from "./client";

export const techStackApi = {
  list: (query = "") => apiRequest(`/tech-stack${query}`),
  get: (id) => apiRequest(`/tech-stack/${id}`),
  create: (payload) =>
    apiRequest("/tech-stack", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/tech-stack/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/tech-stack/${id}`, { method: "DELETE" }),
};
