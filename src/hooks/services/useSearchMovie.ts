import { getClient } from "../../config/api-client";

export const useSearchMovie = () => {
  const searchMovie = async (query: string) => {
    const apiClient = getClient("&query=" + query);
    try {
      const response = await apiClient.get("search/movie");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    searchMovie,
  } as const;
};
