import { useState, useCallback } from "react";
import { ApiError } from "@/lib/api-error";

interface AsyncState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (fn: () => Promise<T>): Promise<T | null> => {
    setState({ data: null, error: null, isLoading: true });
    try {
      const data = await fn();
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (err) {
      const apiError =
        err instanceof ApiError
          ? err
          : new ApiError(500, "UNKNOWN", err instanceof Error ? err.message : "An error occurred");
      setState({ data: null, error: apiError, isLoading: false });
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return { ...state, execute, reset };
}
