import { useEffect, useState } from "react";
import axios from "axios";
import { medusaUrl } from "../../personalizer/common/services/config";

const useAdminBulkOrders = (query) => {
  const [bulkOrders, setBulkOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchBulkOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${medusaUrl}/store/custom/getallbulkorders?${query}`);
        setBulkOrders(response.data.items);
        setCount(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching bulk orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBulkOrders();
  }, [query]);

  return { bulkOrders, isLoading, count };
};

export default useAdminBulkOrders;