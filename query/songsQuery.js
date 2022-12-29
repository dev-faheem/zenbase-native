import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "services/api";
import { prefetchCategoryArtwork, prefetchSongArtwork } from "./prefetch";

export const useQueryPagedCategorySongs = (active = false, categorie, page) => {
  if (active) {
    return useQuery({
      queryKey: ["pagedCategorySongs", categorie, page],
      queryFn: () => fetchPagedCategorySongs(categorie, page),
    });
  }
  return {};
};

export const fetchPagedCategorySongs = async (categorie, page) => {
  const response = await api.get(`/songs/section/${categorie}?page=${page}`);

  return { ...response.result, nextPage: page === response.result.totalPages ? page : page + 1 };
};
