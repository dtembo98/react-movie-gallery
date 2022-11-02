import React, { useState, createContext, useEffect } from "react";

import { IMovie } from "../../types/movie.type";

type FavouriteMoviesContextType = {
  favouriteMovies: IMovie[];
  isLoading: boolean;
  error: string;
  addToFavouriteList: (movie: IMovie) => void;
  removeFromFavouriteList: (movie: IMovie) => void;
  deleteAllMovies: () => void;
};

export const FavouriteMoviesContext = createContext<FavouriteMoviesContextType>(
  {
    favouriteMovies: [],
    isLoading: false,
    error: "",
    addToFavouriteList: () => {},
    removeFromFavouriteList: () => {},
    deleteAllMovies: () => {},
  }
);

type FavouriteMoviesProviderProps = {
  children: React.ReactNode;
};

export const FavouriteMoviesProvider = (
  props: FavouriteMoviesProviderProps
) => {
  const [favouriteMovies, setFavouritesMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState<any>();

  useEffect(() => {
    setIsloading(true);
    loadFavouriteMovies();
    setIsloading(false);
  }, []);

  const saveFavouriteMovie = async (movies: IMovie[]) => {
    try {
      const jsonValue = JSON.stringify(movies);
      await localStorage.setItem("@favourites", jsonValue);
    } catch (error) {
      setError(error);
    }
  };

  const loadFavouriteMovies = async () => {
    try {
      const value = await localStorage.getItem("@favourites");
      if (value !== null) {
        setFavouritesMovies(JSON.parse(value));
      }
    } catch (err) {
      setError(error);
    }
  };

  const clearAllMovies = async () => {
    try {
      const jsonValue = JSON.stringify([]);
      await localStorage.setItem("@favourites", jsonValue);
      setFavouritesMovies([]);
    } catch (error) {
      setError(error);
    }
  };

  const addFavouriteMovie = (movie: IMovie) => {
    setFavouritesMovies([...favouriteMovies, movie]);
    let faveMovies = [...favouriteMovies, movie];
    saveFavouriteMovie(faveMovies);
  };

  const removeFavouriteMovie = (movie: IMovie) => {
    const newFavouriteMovies = favouriteMovies.filter((m) => m.id !== movie.id);
    setFavouritesMovies(newFavouriteMovies);
    saveFavouriteMovie(newFavouriteMovies);
  };

  return (
    <FavouriteMoviesContext.Provider
      value={{
        favouriteMovies: favouriteMovies,
        addToFavouriteList: addFavouriteMovie,
        removeFromFavouriteList: removeFavouriteMovie,
        deleteAllMovies: clearAllMovies,
        isLoading: isLoading,
        error: error,
      }}>
      {props.children}
    </FavouriteMoviesContext.Provider>
  );
};

export const useFavouriteMoviesContext = () =>
  React.useContext(FavouriteMoviesContext);
