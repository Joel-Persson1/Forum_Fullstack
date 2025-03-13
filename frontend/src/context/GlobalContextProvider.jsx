import { createContext, useState } from "react";
import { fetchData } from "../services/apiService.js";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const BASE_URL = "http://localhost:3000";

  const handleApiRequest = async ({
    endpoint,
    id,
    method,
    body,
    headers,
    errMsg,
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      const { success, data, error } = await fetchData({
        endpoint,
        id,
        method,
        body,
        headers,
        errMsg,
      });

      if (!success) {
        setError(error);
        alert(`Error: ${error}`);
        return;
      }

      return data;
    } catch (error) {
      console.error("API request error:", error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const values = {
    BASE_URL,
    fetchData,
    isLoading,
    error,
    handleApiRequest,
  };

  return (
    <GlobalContext.Provider value={values}>{children}</GlobalContext.Provider>
  );
};
