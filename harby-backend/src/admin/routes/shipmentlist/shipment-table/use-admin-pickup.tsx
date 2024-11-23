import { useEffect, useState } from "react";
import axios from "axios";

const useAdminPickupList = (query) => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchPickupRequest = async () => {
      setIsLoading(true);
      try {
        let config = {
          headers: { 
            'Authorization': '0ad30dce7c79c66a6280ba8ab92c3d2a408253c10de5d772cc41bd0e77583a33'
          }
        };
        const response = await axios.get(`https://app.bosta.co/api/v2/pickups?${query}`,config);
        setList(response.data.data.list);
        setCount(response.data.data.total);
      } catch (error) {
        console.error("Error fetching pickups:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPickupRequest();
  }, [query]);

  return { list, isLoading, count };
};

export default useAdminPickupList;