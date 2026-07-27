import api from "./api";

export const applyJob = (id, data) =>
  api.post(`/jobs/${id}/applications`, data);

export const employerApplications = (id) =>
  api.get(`/jobs/${id}/applications`);

export const myApplications = () =>
  api.get("/applications/mine");

export const updateStatus = (id, data) =>
  api.patch(`/applications/${id}/status`, data);