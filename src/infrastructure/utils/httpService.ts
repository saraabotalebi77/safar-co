import axios from "axios";

const BASE_URL = "https://safarcotrave.liara.run/";
const http = axios.create({
    baseURL : BASE_URL,
});

http.interceptors.request.use(
    res=>res,
    err=>Promise.reject(err)
)


export default http;


