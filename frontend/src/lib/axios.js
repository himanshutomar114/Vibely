
//axios - perform HTTP requests like GET , POST , PUT, DELETE 
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5600/api", //backend server url
    withCredentials: true //send cookies with request

})