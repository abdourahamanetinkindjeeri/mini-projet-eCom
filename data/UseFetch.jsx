import { useCallback, useEffect, useState } from "react";

const URL = "http://localhost:3001/";

export default function useFetch(endpoint) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${URL}${endpoint}`);
      if (!response.ok) throw new Error("Erreur réseau...");
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (endpoint) fetchData();
  }, [endpoint, fetchData]);

  return { data, isLoading, error, fetchData };
}
