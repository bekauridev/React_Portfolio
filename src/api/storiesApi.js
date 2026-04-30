import { apiRequest } from "./client";

export const storiesApi = {
  list: (query = "") => apiRequest(`/stories${query}`),
  get: (id) => apiRequest(`/stories/${id}`),
  create: (payload) =>
    apiRequest("/stories", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/stories/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/stories/${id}`, { method: "DELETE" }),
};
