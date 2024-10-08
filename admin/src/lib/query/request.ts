import Axios from "axios";

export const baseURL = import.meta.env.VITE_BASE_URL_REST_API;
export const baseWsUrl = import.meta.env.VITE_BASE_URL_WEBSOCKET
// const refetchTokenURL = ${baseURL}/${V1}/user/refresh-token
async function authRequestInterceptor(config: any) {
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
