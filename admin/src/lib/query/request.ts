import Axios, { InternalAxiosRequestConfig } from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL_API;
console.log("base", baseURL);
// const refetchTokenURL = ${baseURL}/${V1}/user/refresh-token
async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const _token = await localStorage.getItem("user-token");
  // Fix stupid axios typescript
  if (_token && _token !== "undefined" && config.headers) {
    const token = _token;
    config.headers.authorization = `Bearer ${token}`;
    config.withCredentials = true;
    // config.headers.common['Accept-Language'] = localStorage.getItem('language');
    // console.log(`Bearer ${token}`)
  }
  return config;
}

export const request = Axios.create({
  baseURL,
});

request.interceptors.request.use(authRequestInterceptor);