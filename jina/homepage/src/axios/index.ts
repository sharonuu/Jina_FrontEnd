import axios from 'axios'

const BACKEND_IP = "http://localhost"; // 后端IP地址
const PORT = "8089"; // 后端端口
const TIMEOUT = 5000; // 请求超时时间，单位为ms

/**
 * axios全局配置
 */
const request = axios.create({
  baseURL: `${BACKEND_IP}:${PORT}`,
  timeout: TIMEOUT
})

/**
 * axios拦截器
 */
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
request.interceptors.response.use(function (response) {
  // 返回响应的数据部分
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default request;