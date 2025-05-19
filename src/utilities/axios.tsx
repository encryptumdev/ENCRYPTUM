import axios, { AxiosRequestConfig } from "axios";

export const axiosConfig: AxiosRequestConfig = {
  timeout: 15000,
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

const axiosApi = axios.create(axiosConfig);

axiosApi.interceptors.request.use(function (axiosConfig) {
  // const token = getUserJwt()

  // if (token) {
  //     axiosConfig.headers.Authorization = `Bearer ${token}`
  // }

  // Do something before request is sent
  return axiosConfig;
});

// Add a response interceptor
axiosApi.interceptors.response.use(
  function (response) {
    if (response.data.code === 401) {
      // removeUserToken()
      // window.location.href = '/login'
    }

    // Do something with response data
    return response;
  },
  function (error) {
    // if (window.location.pathname !== "/login") {
    //   if (error.response.status === 401) {
    //     // removeUserToken()
    //     // window.location.href = '/login'
    //   }
    // }

    // Do something with response error
    return Promise.reject(error);
  }
);

export { axiosApi };
