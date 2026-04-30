import { apiRequest } from "./client";

export const workStatusApi = {
  list: () => apiRequest("/work-status"),
  get: (id) => apiRequest(`/work-status/${id}`),
  create: (payload) =>
    apiRequest("/work-status", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  update: (id, payload) =>
    apiRequest(`/work-status/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  remove: (id) => apiRequest(`/work-status/${id}`, { method: "DELETE" }),
};
