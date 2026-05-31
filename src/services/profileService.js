import API from "../api/axios";

export const getProfile = async () =>
{
    const response =
        await API.get("/auth/profile");

    return response.data;
};