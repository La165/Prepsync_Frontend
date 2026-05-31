import API from "../api/axios";

export const getTopics = async () => {
  const response = await API.get("/topics");
  return response.data;
};

export const createTopic = async (data) => {
  const response = await API.post("/topics", data);
  return response.data;
};

export const updateTopic = async (id, data) => {
  const response = await API.put(`/topics/${id}`, data);
  return response.data;
};

export const deleteTopic = async (id) => {
  const response = await API.delete(`/topics/${id}`);
  return response.data;
};