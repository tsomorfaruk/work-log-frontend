import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Utils } from "@/lib/utils";
import { ApiResponse } from "@/classes/ApiResponse";
const { buildUrl } = Utils;

export const useApi = (
  { endPoint = "", method = "get", query = {}, pathParams = {}, options = {} },
  initCall: boolean = true
) => {
  const [params, updateUParams] = useState(query);
  const isPause = useRef(!initCall);

  const [response, setResponse] = useState<{
    isLoading: boolean;
    isError: unknown;
    result: object;
  }>({
    isLoading: false,
    isError: true,
    result: {},
  });

  const apiUrl = useMemo(
    () => buildUrl(endPoint, params, pathParams),
    [endPoint, params, pathParams]
  );

  const fetchApiOnUpdate = useCallback(async () => {
    if (isPause.current) return;

    setResponse((prev) => ({ ...prev, isLoading: true }));

    try {
      const { data } = await axios({
        url: apiUrl,
        method,
        ...options,
      });

      if (data.status !== "success") {
        throw new Error(data.message || "Fetching error");
      }

      const result = new ApiResponse(data.body, data.body.totalRecord);
      setResponse({ isLoading: false, isError: false, result });
    } catch (error) {
      setResponse((prev) => ({ ...prev, isError: error, isLoading: false }));
    }
  }, [apiUrl, method, options]);

  const apiRequest = useCallback(
    async ({ payload = {}, options = {} }) => {
      const url = Utils.buildUrl(endPoint, query, pathParams);

      setResponse((prev) => ({ ...prev, isLoading: true }));

      try {
        const { data } = await axios({
          url,
          method,
          data: payload,
          ...options,
        });

        if (data.status !== "success") {
          throw new Error(data.message || "Fetching error");
        }

        const result = new ApiResponse(data.body, data.body.totalRecord);
        setResponse({ isLoading: false, isError: false, result });
      } catch (error) {
        setResponse((prev) => ({ ...prev, isError: error, isLoading: false }));
      }
    },
    [endPoint, query, method, pathParams]
  );

  const setApiPause = useCallback((pause: boolean = true) => {
    isPause.current = pause;
  }, []);

  useEffect(() => {
    fetchApiOnUpdate();
  }, [fetchApiOnUpdate]);

  return {
    ...response,
    apiRequest,
    updateUParams,
    setApiPause,
    isPause,
    params,
    refetch: fetchApiOnUpdate,
  };
};
