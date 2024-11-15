import { useState, useEffect } from "react";
import axiosInstance from "./axiosInstance"; 
const useAxios = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [controller, setController] = useState(null);

  const baseUrl = import.meta.env.VITE_APP_BASE_URL; 

  const fetchData = async (configObj) => {
    const { method, url, requestConfig = {} } = configObj;

    try {
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
      });
      setResponse(res.data);
      
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }

    try {
      const res = await axios.get(`${baseUrl}${url}`);
      console.log(res.data);
    } catch (err) {
      setError(err.message);
    }
  };
  
  console.log(response);
  return [response, error, loading, fetchData];
};

export default useAxios;
