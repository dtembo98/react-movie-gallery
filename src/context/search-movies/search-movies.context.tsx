import React, { useState, createContext, useEffect } from "react";

import { useSearchMovie } from "../../hooks";
import { IMovie } from "../../types/movie.type";

type SearchMoviesContextType = {
  searchedMovies: IMovie[];
  isLoading: boolean;
  error: string;
  handleSearch: (query: string) => void;
};

export const SearchMoviesContext = createContext<SearchMoviesContextType>({
  searchedMovies: [],
  isLoading: false,
  error: "",
  handleSearch: (query: string) => {},
});

type SearchedMoviesProviderProps = {
  children: React.ReactNode;
};

export const SearchMoviesProvider = (props: SearchedMoviesProviderProps) => {
  const { searchMovie } = useSearchMovie();
  const [searchedMovies, setSearchedMovies] = useState<IMovie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  const retrieveSearchedMovies = (query: string) => {
    setIsloading(true);
    setSearchedMovies([]);

    searchMovie(query)
      .then((response) => {
        setIsloading(false);
        setSearchedMovies(response.results);
      })
      .catch((err) => {
        setIsloading(false);
        setError(err);
      });
  };

  useEffect(() => {
    retrieveSearchedMovies(searchTerm);
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <SearchMoviesContext.Provider
      value={{
        searchedMovies,
        isLoading: isLoading,
        error: error,
        handleSearch,
      }}>
      {props.children}
    </SearchMoviesContext.Provider>
  );
};

export const useSearchMoviesContext = () =>
  React.useContext(SearchMoviesContext);
