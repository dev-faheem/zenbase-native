import Axios from "axios";
import { API_URL } from "@env";

const axios = Axios;

axios.defaults.baseURL = API_URL;

axios.handleError = (error) => {
  if (error?.response?.data?.error) {
    alert(error?.response?.data?.error);
  }
};

axios.interceptors.request.use((request) => {
  console.log("Request: ", JSON.stringify(request, null, 2));
  return request;
});

axios.interceptors.response.use((response) => {
  console.log("Response:", JSON.stringify(response, null, 2));
  return response;
});

export default axios;
