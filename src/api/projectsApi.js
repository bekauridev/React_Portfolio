import { apiRequest } from "./client";

export const projectsApi = {
  list: (query = "") => apiRequest(`/projects${query}`),
  get: (id) => apiRequest(`/projects/${id}`),
  create: (payload) =>
    apiRequest("/projects", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/projects/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/projects/${id}`, { method: "DELETE" }),
};
