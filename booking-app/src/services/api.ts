import ApiInstance from "./http";
import { getAuthHeader } from "../helpers/utils";

interface AuthHeader {
  headers: {
    Accept: string;
    "Accept-Language": string;
  };
}

interface Header {
  headers: {
    Accept: string;
    "Accept-Language": string;
    Authorization: string | null;
  };
}

export const getApi = async (url: string) => {
  const data: any = await ApiInstance.get(`${url}`);
  return data;
};

export const postApi = (url: string, apiData: any) => {
  return ApiInstance.post(`${url}`, apiData);
};

export const authPostApi = async (url: string, apiData: any) => {
  const headers: AuthHeader = getAuthHeader();
  try {
    const data: any = await ApiInstance.post(`${url}`, apiData, headers);
    return data;
  } catch (error: any) {
    return error.response;
  }
  // return ApiInstance.post(`${config.apiBaseUrl}${url}`, apiData,headers)
};