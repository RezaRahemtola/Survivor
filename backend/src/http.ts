import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { HttpException } from '@nestjs/common'

export type HttpMethod = 'get' | 'delete' | 'head' | 'options'
export type DataHttpMethod = 'put' | 'post' | 'patch'

export const AUTHORIZED_HEADERS = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
})
export const AUTHORIZED_AXIOS_CONFIGURATION = (accessToken: string) => ({
  headers: AUTHORIZED_HEADERS(accessToken),
})

export async function runHttpRequestWithData<ResponseType = any, RequestDataType = any>(axiosClient: AxiosInstance, method: DataHttpMethod, url: string, data?: RequestDataType, axiosConfiguration?: AxiosRequestConfig<RequestDataType>): Promise<ResponseType> {
  return axiosClient[method]<ResponseType, AxiosResponse<ResponseType>, RequestDataType>(url, data, axiosConfiguration)
    .then(({data}) => data)
    .catch(({response: {data, status}}) => {
      throw new HttpException(data, status)
    })
}

export async function runHttpRequest<ResponseType = any>(axiosClient: AxiosInstance, method: HttpMethod, url: string, axiosConfiguration?: AxiosRequestConfig): Promise<ResponseType> {
  return axiosClient[method]<ResponseType>(url, axiosConfiguration)
    .then(({data}) => data)
    .catch(({response: {data, status}}) => {
      throw new HttpException(data, status)
    })
}
