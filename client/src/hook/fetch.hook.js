import axios from 'axios';
import { useEffect, useState } from 'react';
import { getUsername } from '../helper/helper';
axios.defaults.baseURL = import.meta.env.VITE_APP_SERVER_URL;

export default function useFetch(query) {
  const [getData, setData] = useState({
    loading: false,
    apiData: undefined,
    serverError: null,
    status: null,
  });

  useEffect(() => {
    // if (!query) return;
    const fetchData = async () => {
      try {
        setData(prev => ({ ...prev, isLoading: true }));
        const {username} = getUsername();
        const { data, status } = !query ? await axios.get(`/api/user/${username}`) : await axios.get(`/api/${query}`);
        if (status === 201) {
          setData(prev => ({
            ...prev,
            isLoading: false,
            apiData: data,
            status: status,
          }));
        }
        setData(prev => ({ ...prev, isLoading: false }));
      } catch (error) {
        setData(prev => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);
  return [getData, setData];
}
