import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import env from '@/env'
import store from '@/store'
import { authService } from '@/services'
import { updateToken } from '@/store/userReducer'
import { isType } from '@/utils'

const { REQUEST_BASE_URL, REQUEST_SUCCESS_CODE } = env
const TOKEN_HEADER = 'Authorization'

const axiosInstance = axios.create({
  baseURL: REQUEST_BASE_URL,
  timeout: 10000
})

const requestInterceptors = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (config.headers) {
    const { access_token } = store.getState().user
    if (access_token) {
      config.headers[TOKEN_HEADER] = `Bearer ${access_token}`
    }
  }
  return config
}
const requestErrorInterceptors = (error: any) => {
  return Promise.reject(error)
}

axiosInstance.interceptors.request.use(
  requestInterceptors,
  requestErrorInterceptors
)

let refreshTokenPromise: Promise<any> | null
const handleUnauthorizedError = async () => {
  if (refreshTokenPromise) return refreshTokenPromise
  refreshTokenPromise = new Promise(async (resolve, reject) => {
    try {
      const { data } = await authService.refreshToken()
      const { access_token, refresh_token } = data
      store.dispatch(updateToken({ access_token, refresh_token }))
      refreshTokenPromise = null
      resolve(true)
    } catch (err) {
      reject()
    }
  })
  return refreshTokenPromise
}

const responseInterceptors = async (res: AxiosResponse) => {
  const { data } = res
  if (!data || !isType(data, 'object'))
    return Promise.reject('接口数据结构异常')

  const { code } = data
  if (code !== REQUEST_SUCCESS_CODE) return Promise.reject(data)

  return Promise.resolve(data)
}

const responseErrorInterceptors = async (error: any) => {
  if (error.response.status === 401) {
    try {
      await handleUnauthorizedError()
      return axiosInstance(error.config)
    } catch (err) {
      return Promise.reject(error)
    }
  }
  return Promise.reject(error)
}

axiosInstance.interceptors.response.use(
  responseInterceptors,
  responseErrorInterceptors
)

export default axiosInstance
