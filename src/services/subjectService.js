import API from "../api/axios"

export const getTasks=async() =>
{
    const response=await API.get("/subjects");
    return response.data;
}

export const createTask=async(taskData) =>
{
    const response=await API.post("/subjects",taskData);
    return response.data;
}

export const updateTask=async(id,updatedTask) =>
{
    const response=await API.put(`/subjects/${id}`,updatedTask);
    return response.data;
}

export const deleteTask=async(id)=>
{
const response=await API.delete(`/subjects/${id}`);
return response.data;
}


