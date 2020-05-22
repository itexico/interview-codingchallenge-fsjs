import { useMemo, useCallback } from "react";

const { API_URL } = process.env;

const fetchOptions = {
  headers: {
    "content-type": "application/json",
  },
};

export const useGetJSON = () => {
  const controller = useMemo(() => new AbortController());
  const signal = useMemo(() => controller.signal);

  const getJSON = useCallback(
    (path) =>
      new Promise((resolve, reject) => {
        fetch(`${API_URL}${path}`, { signal })
          .then((response) => response.json())
          .then((json) => resolve(json))
          .catch((error) => reject(error));
      })
  );

  const abort = useCallback(() => {
    controller.abort();
  });

  return [getJSON, abort];
};

export const useSendJSON = () => {
  const controller = useMemo(() => new AbortController());
  const signal = useMemo(() => controller.signal);

  const sendJSON = useCallback(
    (path, { method, body }) =>
      new Promise((resolve, reject) => {
        fetch(`${API_URL}${path}`, {
          signal,
          method,
          body: JSON.stringify(body),
          ...fetchOptions,
        })
          .then((response) => response.json())
          .then((json) => resolve(json))
          .catch((error) => reject(error));
      })
  );

  const abort = useCallback(() => {
    controller.abort();
  });

  return [sendJSON, abort];
};
