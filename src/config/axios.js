import axios from 'axios'

function requestSuccessFunc(requestObj) {
  let token = localStorage.getItem('TOKEN') ? localStorage.getItem('TOKEN') : '';
  if (token) {
    requestObj.headers.Authorization = token
  }
  return requestObj
}

function requestFailFunc(requestError) {
  return Promise.reject(requestError)
}

function responseSuccessFunc(responseObj) {
  const resData = responseObj.data
  const { result } = resData;
  if (result === 9) {
    location.href = '/'
  }
  return resData
}

function responseFailFunc(responseError) {
  return Promise.reject(responseError)
}

// 各个配置的默认配置
const AXIOS_DEFAULT_CONFIG = {
  timeout: 20000,
  maxContentLength: 2000,
}

let axiosInstance = {}

axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG);

// 注入请求拦截
axiosInstance.interceptors.request.use(requestSuccessFunc, requestFailFunc)
// 注入失败拦截
axiosInstance.interceptors.response.use(responseSuccessFunc, responseFailFunc)

export default axiosInstance
