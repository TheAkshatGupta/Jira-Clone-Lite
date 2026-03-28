import axios from "axios";

const API = axios.create({
  baseURL: "https://jira-clone-backend-0kf2.onrender.com/",
});

export default API;