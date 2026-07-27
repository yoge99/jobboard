import api from "./api";

export const getJobs = () =>
  api.get("/jobs");

export const getJob = (id) =>
  api.get(`/jobs/${id}`);

export const createJob = (data) =>
  api.post("/jobs", data);

export const myJobs = () =>
  api.get("/jobs/mine/list");

export const deleteJob = (id) =>
  api.delete(`/jobs/${id}`);

export const updateJob = (id, data) =>
  api.put(`/jobs/${id}`, data);