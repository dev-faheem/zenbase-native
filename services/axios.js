import Axios from "axios";
// import { config.API_URL } from '@env';
import config from "../config";

const axios = Axios;

axios.defaults.baseURL = config.LEGACY_API_URL;

axios.handleError = (error) => {
  if (error?.response?.data?.error) {
    alert(error?.response?.data?.error);
  }
};

axios.interceptors.request.use((request) => {
  console.log(
    `Request: ${request.method?.toUpperCase()} ${request.url} ${
      JSON.stringify(request.data, null, 2) || ""
    }`,
    request.headers.authorization
  );
  return request;
});

// axios.interceptors.response.use((response) => {
//   // console.log("Response:", JSON.stringify(response, null, 2));
//   console.log("Axios Response", {
//     url: `${response.request._method} ${response.request._url}`,
//     data: response.data?.data || response.data,
//     code: response.status,
//   });
//   return response;
// });

export default axios;
