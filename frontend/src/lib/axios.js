import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5600/api",
    withCredentials: true //send cookies with request

})