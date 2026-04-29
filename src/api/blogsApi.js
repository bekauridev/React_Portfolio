import { apiRequest } from "./client";

export const blogsApi = {
  list: (query = "") => apiRequest(`/blogs${query}`),
  get: (id) => apiRequest(`/blogs/${id}`),
  create: (payload) =>
    apiRequest("/blogs", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/blogs/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/blogs/${id}`, { method: "DELETE" }),
};
