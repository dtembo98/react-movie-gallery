import React, { useState, createContext, useEffect } from "react";

import { useGetPopularMovies } from "../../hooks";
import { IMovie } from "../../types/movie.type";

type PopularMoviesContextType = {
  popularMovies: IMovie[];
  isLoading: boolean;
  error: string;
  retrievePopularMovies: () => void;
};

export const PopularMoviesContext = createContext<PopularMoviesContextType>({
  popularMovies: [],
  isLoading: false,
  error: "",
  retrievePopularMovies: () => {},
});

type PopularMoviesProviderProps = {
  children: React.ReactNode;
};

export const PopularMoviesProvider = (props: PopularMoviesProviderProps) => {
  const { getPopularMovies } = useGetPopularMovies();
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const retrievePopularMovies = () => {
    setIsloading(true);
    setPopularMovies([]);

    getPopularMovies()
      .then((response) => {
        setIsloading(false);
        setPopularMovies(response.results);
      })
      .catch((err) => {
        setIsloading(false);
        setError(err);
      });
  };

  useEffect(() => {
    retrievePopularMovies();
  }, []);

  return (
    <PopularMoviesContext.Provider
      value={{
        popularMovies: popularMovies,
        isLoading: isLoading,
        error: error,
        retrievePopularMovies,
      }}>
      {props.children}
    </PopularMoviesContext.Provider>
  );
};

export const usePopularMoviesContext = () =>
  React.useContext(PopularMoviesContext);
