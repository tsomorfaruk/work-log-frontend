import { useCallback, useEffect, useRef, useState } from "react";
import { ApiResponse, IApiResponse } from "@/classes/ApiResponse";
import AxiosInstance from "@/apis/axiosInstance";
import { isEqual } from "lodash";
import { UseApiConfig, ApiHookState, UpdateQueryType } from "@/types";
import { Utils } from "@/lib/utils";

const { buildUrl } = Utils;

export const useApi = <T>(
  {
    endpoint = "",
    method = "get",
    query = {},
    pathParams = {},
    options = {},
  }: UseApiConfig,
  initCall: boolean = true
) => {
  const oldConfigRef = useRef({
    endpoint,
    method,
    query,
    options,
    pathParams,
  });

  const [apiConfig, setApiConfig] = useState(oldConfigRef.current);
  const isPaused = useRef(!initCall);

  const [response, setResponse] = useState<ApiHookState<T>>({
    isLoading: false,
    hasError: null,
    result: {} as ApiResponse<T>,
  });

  // --------------------------
  // Update Query
  // --------------------------
  const updateQuery = (modifier: UpdateQueryType) => {
    setApiConfig((prev) => ({
      ...prev,
      query: typeof modifier === "function" ? modifier(prev.query) : modifier,
    }));
  };

  // --------------------------
  // Auto fetch when config changes
  // --------------------------
  const fetchApi = useCallback(async () => {
    const { endpoint, method, query, pathParams, options } = apiConfig;
    const url = buildUrl(endpoint, query, pathParams);

    if (isPaused.current) return;

    setResponse((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data } = await AxiosInstance({
        url,
        method,
        ...options,
      });

      if (data.status !== "success") {
        throw new Error(data.message ?? "API error");
      }

      const result = new ApiResponse<T>(data as IApiResponse<T>);
      setResponse({ isLoading: false, hasError: null, result });
    } catch (err) {
      setResponse((prev) => ({
        ...prev,
        isLoading: false,
        hasError: err,
      }));
    }
  }, [apiConfig]);

  // --------------------------
  // Manual API Request
  // --------------------------
  const apiRequest = useCallback(
    async ({
      payload = {},
      options: overrideOptions = {},
    }: {
      payload?: unknown;
      options?: Record<string, unknown>;
    }) => {
      const { endpoint, method, query, pathParams, options } = apiConfig;
      const url = buildUrl(endpoint, query, pathParams);

      setResponse((prev) => ({ ...prev, isLoading: true }));

      try {
        const { data } = await AxiosInstance({
          url,
          method,
          data: payload,
          ...options,
          ...overrideOptions,
        });

        if (data.status !== "success") {
          throw new Error(data.message ?? "API error");
        }

        const result = new ApiResponse<T>(data as IApiResponse<T>);
        setResponse({ isLoading: false, hasError: null, result });

        return { isLoading: false, hasError: null, result };
      } catch (err) {
        setResponse((prev) => ({
          ...prev,
          isLoading: false,
          hasError: err,
        }));

        return {
          isLoading: false,
          hasError: err,
          result: {} as ApiResponse<T>,
        };
      }
    },
    [apiConfig]
  );

  // --------------------------
  // Pause / Resume API
  // --------------------------
  const setApiPause = useCallback((pause: boolean = true) => {
    isPaused.current = pause;
  }, []);

  // --------------------------
  // React: Re-run when config changes
  // --------------------------
  useEffect(() => {
    fetchApi();
  }, [fetchApi]);

  useEffect(() => {
    const newConfig = { endpoint, method, query, pathParams, options };

    if (!isEqual(oldConfigRef.current, newConfig)) {
      oldConfigRef.current = newConfig;
      setApiConfig(newConfig);
    }
  }, [endpoint, method, query, pathParams, options]);

  return {
    ...response,
    updateQuery,
    apiRequest,
    setApiPause,
    refetch: fetchApi,
    isPaused,
  };
};
