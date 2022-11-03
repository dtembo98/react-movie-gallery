import React, { useState, createContext, useEffect } from "react";

import { useGetPopularMovies } from "../../hooks";
import { IMovie } from "../../types/movie.type";

type PopularMoviesContextType = {
  popularMovies: IMovie[];
  isLoading: boolean;
  error: string;
  page: number;
  setPage: (page: number) => void;
  retrievePopularMovies: () => void;
};

export const PopularMoviesContext = createContext<PopularMoviesContextType>({
  popularMovies: [],
  isLoading: false,
  error: "",
  page: 1,
  retrievePopularMovies: () => {},
  setPage: (page: number) => {},
});

type PopularMoviesProviderProps = {
  children: React.ReactNode;
};

export const PopularMoviesProvider = (props: PopularMoviesProviderProps) => {
  const { getPopularMovies } = useGetPopularMovies();
  const [popularMovies, setPopularMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const retrievePopularMovies = () => {
    setIsloading(true);
    setPopularMovies([]);

    getPopularMovies(page)
      .then((response) => {
        setIsloading(false);
        setPopularMovies([...popularMovies, ...response.results]);
      })
      .catch((err) => {
        setIsloading(false);
        setError(err);
      });
  };

  useEffect(() => {
    retrievePopularMovies();
  }, [page]);

  return (
    <PopularMoviesContext.Provider
      value={{
        popularMovies: popularMovies,
        isLoading: isLoading,
        error: error,
        retrievePopularMovies,
        page: page,
        setPage,
      }}>
      {props.children}
    </PopularMoviesContext.Provider>
  );
};

export const usePopularMoviesContext = () =>
  React.useContext(PopularMoviesContext);
