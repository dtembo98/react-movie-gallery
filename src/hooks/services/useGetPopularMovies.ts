import { getClient } from "../../config/api-client";

export const useGetPopularMovies = () => {
  const getPopularMovies = async (page: number) => {
    const apiClient = getClient(`&page=${page}`);
    try {
      const response = await apiClient.get(`movie/popular/`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getPopularMovies,
  } as const;
};
