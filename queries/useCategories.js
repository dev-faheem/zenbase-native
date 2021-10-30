import axios from "services/axios";
import { useQuery } from "react-query";

export async function getCategories() {
  const response = await axios.get(`/categories`);
  return response?.data?.data;
}

export default function useCategories() {
  return useQuery(["category"], async () => {
    return await getCategories();
  });
}
