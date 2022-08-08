import axios from "axios";

export default axios.create({
    baseURL: "http://192.168.0.178:8088/api",
    headers: {
        "Content-type": "application/json"
    }
});