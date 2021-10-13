import axios from "services/axios";
import { useQuery } from "react-query";

export default function useSong(id) {
  return useQuery(["song", id], () => async (id) => {
    const { data } = await axios.get(`/songs/${id}`);
    return { data };
  });
}
