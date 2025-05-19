import { axiosApi } from "@/utilities/axios";
import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface ApiResponse<T> {
  data: T;
}

export interface Fetcher<D> {
  url: string;
  data?: D;
  config?: AxiosRequestConfig<D>;
  useAuth?: boolean;
}

export async function fetcherGET<T, D = any>({
  url,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.get<any, AxiosResponse<ApiResponse<T>, any>, any>(
    url,
    config
  );

  return res.data.data;
}

export async function fetcherPOST<T, D = any>({
  url,
  data,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.post<any, AxiosResponse<ApiResponse<T>, any>, any>(
    url,
    data,
    config
  );

  return res.data.data;
}

export async function fetcherPATCH<T, D = any>({
  url,
  data,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.patch<
    any,
    AxiosResponse<ApiResponse<T>, any>,
    any
  >(url, data, config);

  return res.data.data;
}

export async function fetcherPUT<T, D = any>({
  url,
  data,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.put<any, AxiosResponse<ApiResponse<T>, any>, any>(
    url,
    data,
    config
  );

  return res.data.data;
}

export async function fetcherDELETE<T, D = any>({
  url,
  config,
}: Fetcher<D>): Promise<T> {
  const res = await axiosApi.delete<
    any,
    AxiosResponse<ApiResponse<T>, any>,
    any
  >(url, config);

  return res.data.data;
}
