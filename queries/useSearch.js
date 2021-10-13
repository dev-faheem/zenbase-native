import axios from "services/axios";
import { useQuery } from "react-query";

export default function useSearch(query) {
  return useQuery(["search", query], () => async () => {
    const { data } = await axios.get(`/songs`, {
      data: query,
    });
    return { data };
  });
}
