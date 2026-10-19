import { httpStatusCode } from "@/constants/http-status-code";
import axios, {
  isAxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

declare module "axios" {
  export interface AxiosRequestConfig {
    path?: Record<string, string | number>;
  }
}

export interface Payload {
  path?: Record<string, string | number>;
  params?: Partial<Record<string, string | number>>;
  body?: unknown;
}

export interface Config {
  baseURL?: string;
  tokenKey?: string;
  unauthorize?: () => void;
  withCredentials?: boolean;
}

export interface Options {
  auth?: boolean;
  responseType?: AxiosRequestConfig["responseType"];
  headers?: AxiosRequestConfig["headers"];
}

export class HttpClient {
  private readonly instance: AxiosInstance;
  private readonly tokenKey: string = "token";
  private readonly unauthorize?: () => void;

  constructor(config: Config = {}) {
    if (config.tokenKey) {
      this.tokenKey = config.tokenKey;
    }
    if (config.unauthorize) {
      this.unauthorize = config.unauthorize;
    }
    this.instance = axios.create({
      baseURL: config.baseURL ?? window.location.origin,
      withCredentials: config.withCredentials ?? false,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config) => {
        if (config.path && config.url) {
          Object.entries(config.path).forEach(([key, value]) => {
            config.url = config.url!.replace(
              `:${key}`,
              encodeURIComponent(String(value)),
            );
          });
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === httpStatusCode.UNAUTHORIZED) {
          this.unauthorize?.();
        }
        return Promise.reject(error);
      },
    );
  }

  private storage() {
    return localStorage;
  }

  private token() {
    return this.storage().getItem(this.tokenKey);
  }

  private config(payload?: Payload, options?: Options): AxiosRequestConfig {
    return {
      params: payload?.params,
      path: payload?.path,
      headers: {
        ...(options?.auth &&
          this.token() && {
            Authorization: `Bearer ${this.token()}`,
          }),
        ...options?.headers,
      },
      responseType: options?.responseType,
    };
  }

  public async get<T>(url: string, payload?: Payload, options?: Options) {
    try {
      const config = this.config(payload, options);
      const response = await this.instance.get<T>(url, config);
      return response;
    } catch (error) {
      throw new Error(
        isAxiosError(error)
          ? error.response?.data?.detail
          : (error as Error).message,
      );
    }
  }

  public async post<T>(url: string, payload?: Payload, options?: Options) {
    try {
      const data = payload?.body;
      const config = this.config(payload, options);
      const response = await this.instance.post<T>(url, data, config);
      return response;
    } catch (error) {
      throw new Error(
        isAxiosError(error)
          ? error.response?.data?.detail
          : (error as Error).message,
      );
    }
  }

  public async patch<T>(url: string, payload?: Payload, options?: Options) {
    try {
      const data = payload?.body;
      const config = this.config(payload, options);
      const response = await this.instance.patch<T>(url, data, config);
      return response;
    } catch (error) {
      throw new Error(
        isAxiosError(error)
          ? error.response?.data?.detail
          : (error as Error).message,
      );
    }
  }
}
