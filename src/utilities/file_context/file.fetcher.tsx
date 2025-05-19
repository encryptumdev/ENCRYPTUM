import { fetcherPOST } from "@/utilities/fetcher";

export async function fetchQueryFiles(data: any): Promise<any> {
  const url = `/api/query`;
  return await fetcherPOST({ url, data, useAuth: true });
}

export async function postFiles(data: any): Promise<any> {
  const url = `/api/files`;
  return await fetcherPOST({ url, data, useAuth: true });
}
