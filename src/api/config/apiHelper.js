import { trackPromise } from "react-promise-tracker";

const apiHelper = {
  get: (url, params = {}, axiosInstance) => trackPromise(axiosInstance.get(url, { params })),
  post: (url, body, axiosInstance) => trackPromise(axiosInstance.post(url, body)),
  put: (url, body, axiosInstance) => trackPromise(axiosInstance.put(url, body)),
  delete: (url, body, axiosInstance) => trackPromise(axiosInstance.delete(url, body)),
};

export default apiHelper;
