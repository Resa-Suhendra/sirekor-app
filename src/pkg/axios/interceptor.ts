import { ENV } from "@/configs/env";
import axios, {
	type AxiosInstance,
	type AxiosResponse,
	type AxiosError,
	type InternalAxiosRequestConfig,
} from "axios";
import { createCookies, getCookies } from "@/hooks/use-cookies";

async function refreshToken(): Promise<string> {
  const refreshToken = await getCookies("refresh_token");
  if (!refreshToken?.value) throw new Error("No refresh token");

  const response = await axios.post<{
    results: { token?: string; refreshToken?: string };
  }>(
    `${ENV.BASE_URL}/api/sso/auth/refresh-token`,
    { refresh_token: refreshToken.value },
    {
      headers: { "Content-Type": "application/json" },
    },
  );
  const { token, refreshToken: newRefreshToken } = response.data.results || {};
  if (token)
    await createCookies({
      name: "token",
      data: token,
    });
  if (newRefreshToken)
    await createCookies({
      name: "refresh_token",
      data: newRefreshToken,
    });

  if (!token) throw new Error("No token received from refresh");

  return token;
}

interface FailedQueueItem {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

function createApiInstance(prefix: string): AxiosInstance {
  const api: AxiosInstance = axios.create({
    baseURL: ENV.BASE_URL + prefix,
    timeout: 10000,
    headers: {
      // Default content-type, only for JSON, not for FormData!
      // "Content-Type": "application/json",
    },
  });

  let isRefreshing = false;
  let failedQueue: FailedQueueItem[] = [];

  const processQueue = (error: unknown, token: string | null = null): void => {
    for (const prom of failedQueue) {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    }
    failedQueue = [];
  };

  api.interceptors.request.use(
    async (config) => {
      config.headers = config.headers || {};

      // Only set JSON content-type if NOT FormData
      const isFormData = config.data instanceof FormData;
      if (!isFormData && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }

      const token = await getCookies("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token.value}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  api.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => response,
    async (error: AxiosError): Promise<unknown> => {
      const originalRequest = error.config as RetryableRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise<string | null>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (token && originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return api(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        return new Promise((resolve, reject) => {
          (async () => {
            try {
              const newToken = await refreshToken();
              processQueue(null, newToken);
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(api(originalRequest));
            } catch (err) {
              processQueue(err, null);
              reject(err);
            } finally {
              isRefreshing = false;
            }
          })();
        });
      }

      if (error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    },
  );

  return api;
}

export const api = {
  sso: createApiInstance("/api/sso"),
  core: createApiInstance("/api/core"),
  article: createApiInstance("/api/article"),
  payment: createApiInstance("/api/payment"),
};

export default api;
