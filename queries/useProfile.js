import axios from "services/axios";
import { useQuery } from "react-query";

export default function useProfile() {
  return useQuery(["profile"], () => async () => {
    const { data } = await axios.get(`/profile`);
    return { data };
  });
}
