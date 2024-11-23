import { useEffect, useState } from "react";
import axios from "axios";
import { medusaUrl } from "../../personalizer/common/services/config";

const useNewsletter = (query) => {
  const [newsLetter, setNewsLetter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchSetNewsLetter = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${medusaUrl}/store/custom/getallsubscription?${query}`);
        setNewsLetter(response.data.items);
        setCount(response.data.totalItems);
      } catch (error) {
        console.error("Error fetching newsletter:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSetNewsLetter();
  }, [query]);

  return { newsLetter, isLoading, count };
};

export default useNewsletter;