import axios, { AxiosRequestConfig } from "axios";
function request(axiosConfig: AxiosRequestConfig) {
  const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL, //env
    timeout: 10000,
  });
  //请求拦截器全局
  service.interceptors.request.use(
    (config) => {
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  //响应拦截器全局
  service.interceptors.response.use(
    (res) => {
      if (res.data.code && res.data.code !== 0) {
        throw new Error(res.data.msg);
      }
      if (!res.data.code && res.data.code !== 0) {
        const resType = Object.prototype.toString.call(res.data);
        const isBlob = resType === "[object Blob]";
        if (isBlob || resType === "[object String]") return res;
      }
      return res.data;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return service(axiosConfig);
}
export default request;
