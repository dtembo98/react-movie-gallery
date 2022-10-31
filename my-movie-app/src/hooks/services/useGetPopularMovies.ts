import apiClient from "../../config/api-client";

export const useGetPopularMovies = () => {
  const getPopularMovies = async () => {
    try {
      const response = await apiClient.get("movie//popular");
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    getPopularMovies,
  } as const;
};
