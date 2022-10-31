import apiClient from "../../config/api-client";

export const useSearchMovie = () => {
  const searchMovie = async (query: string) => {
    try {
      const response = await apiClient.get(`search/movie?&query=${query}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return {
    searchMovie,
  } as const;
};
