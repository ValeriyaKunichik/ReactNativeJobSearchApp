import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {

    method: "GET",
    url: `https://jobsearch4.p.rapidapi.com/api/v1/Jobs/${endpoint}`,
    headers: {
      'X-RapidAPI-Key': '05d12a8264mshc53a6306ff50c0fp171081jsn15dc54d4bd',
      'X-RapidAPI-Host': 'jobsearch4.p.rapidapi.com'
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };
  
  console.log(isLoading)
  return { data, isLoading, error, refetch };
};

export default useFetch;