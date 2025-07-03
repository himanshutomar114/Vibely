
//axios - perform HTTP requests like GET , POST , PUT, DELETE 
import axios from "axios";

//for deployment of website we use the base_url beacuse it changes the backend url on server


export const axiosInstance = axios.create({
    baseURL: "http://localhost:5600/api", //backend server url
    withCredentials: true //send cookies with request

})