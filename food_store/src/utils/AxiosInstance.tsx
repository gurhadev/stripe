import axios from "axios";
import Cookies from "js-cookie";
import refreshToken from "../service/refreshToken";

const AxiosIntance = axios.create({
    baseURL: "http://localhost:8000/api",
    withCredentials :true,
    headers: {
        "Content-Type": "application/json",
    }
});

AxiosIntance.interceptors.request.use((config) => {
    const token = Cookies.get("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});


AxiosIntance.interceptors.response.use((response) => {
    return response;
}, async (err) => {
    const requestOrigin = err.config;
    if (!requestOrigin._retry && err.response.status === 401) {
        requestOrigin._retry = true;
        try {
            const newTtoken = await refreshToken() || "";
            Cookies.set("token", newTtoken);
            requestOrigin.headers.Authorization = `Bearer ${newTtoken}`;
            return AxiosIntance(requestOrigin);
        } catch (error) {
            Cookies.remove("token");
            Cookies.remove("user");
            window.location.href = "/login";
            return Promise.reject(error);
        }
    }
    return Promise.reject(err);
});









export default AxiosIntance;