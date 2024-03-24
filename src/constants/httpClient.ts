import axios, {
  AxiosInstance,
  AxiosResponse,
  Method,
  AxiosPromise,
} from "axios";
import { BASE_URL } from "./urls";
import toast from "react-hot-toast";
export interface Request {
  headers?: Record<string, string>;
  data?: any;
  params?: any;
}
export class HttpClient {
  private httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: BASE_URL,
      responseType: "json",
      timeout: 60000,
    });
    this.httpClient.interceptors.request.use();
    this.httpClient.interceptors.response.use();
  }

  private async handleRequest(
    url: string,
    method: Method,
    config: Request = {}
  ): Promise<AxiosResponse<any>> {
    const { headers, data, params } = config;
    try {
      const response = await this.httpClient.request({
        url,
        method,
        data,
        params,
        headers,
      });
      return response;
    } catch (e: any) {
        toast.error(e)
        return e.error;
    }
  }

  public get<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, "get", config);
  }

  public post<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, "post", config);
  }

  public put<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, "put", config);
  }

  public delete<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, "delete", config);
  }

  public patch<T>(url: string, config: Request = {}): AxiosPromise<T> {
    return this.handleRequest(url, "patch", config);
  }
}

export default new HttpClient();
