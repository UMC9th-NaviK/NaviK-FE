import axios from "axios";

export const getNotionOauth = async () => {
    const token = localStorage.getItem('accessToken');

    const response = await axios.get(`${import.meta.env.VITE_OAUTH_API_URL}/api/notion/oauth/authorize`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })

    return response.data;
}