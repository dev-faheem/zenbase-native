import axios from "services/axios";
import { useQuery } from "react-query";

export default function useCategories() {
  return useQuery(["category"], () => async () => {
    const { data } = await axios.get(`/categories`);
    return { data };
  });
}
