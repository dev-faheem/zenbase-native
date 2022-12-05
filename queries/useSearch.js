import axios from "services/axios";
import { useMutation } from "react-query";

export async function getSearch(query) {
  try {
    const response = await axios.get(`/songs`, {
      params: query,
    });
    return response.data?.data;
  } catch (e) {
    console.error(e);
  }
}

export default function useSearch(options) {
  return useMutation(["search"], async (query) => await getSearch(query), options);
}
