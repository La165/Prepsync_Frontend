// services/analyticsService.js

import API from "../api/axios";

export const getDashboard = async () => {
  const res = await API.get("/analytics/dashboard");
  return res.data;
};

export const getWeakAreas = async () => {
  const response = await API.get("/analytics/weak-areas");
  return response.data;
};

export const getStudyPlan = async () => {
  const response = await API.get("/analytics/studyplan");
  return response.data;
};