import API from "../api/axios";

export const getOverdueTopics = async () => {

  const response =
    await API.get("/topics/overdue");

  return response.data;
};

export const reviseTopic = async (id) => {

  const response =
    await API.put(`/topics/${id}/revise`);

  return response.data;
};

export const getRevisionQueue = async () => {

  const response =
    await API.get("/topics/revision-queue");

  return response.data;
};