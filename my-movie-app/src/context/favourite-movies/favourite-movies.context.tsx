import React, { useState, createContext, useEffect } from "react";

import { useGetPopularMovies } from "../../hooks";
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
  const {} = useGetPopularMovies();
  const [favouriteMovies, setFavouritesMovies] = useState<IMovie[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadFavouriteMovies();
  }, []);
  useEffect(() => {
    saveFavouriteMovie(favouriteMovies);
  }, [favouriteMovies]);

  const saveFavouriteMovie = async (movies: IMovie[]) => {
    try {
      const jsonValue = JSON.stringify(movies);
      await localStorage.setItem("@favourutes", jsonValue);
    } catch (error) {
      console.log("error setting item");
    }
  };

  const loadFavouriteMovies = async () => {
    try {
      const value = await localStorage.getItem("@favourutes");
      if (value !== null) {
        setFavouritesMovies(JSON.parse(value));
      }
    } catch (err) {
      console.log("error loading ", err);
    }
  };

  const clearAllMovies = async () => {
    try {
      console.log("clearing all movies");
      const jsonValue = JSON.stringify([]);
      await localStorage.setItem("@favourutes", jsonValue);
      setFavouritesMovies([]);
    } catch (error) {
      console.log("error setting item");
    }
  };

  const addFavouriteMovie = (movie: IMovie) => {
    console.log("addFavouriteMovie", movie);
    setFavouritesMovies([...favouriteMovies, movie]);
  };

  const removeFavouriteMovie = (movie: IMovie) => {
    const newFavouriteMovies = favouriteMovies.filter((m) => m.id !== movie.id);

    setFavouritesMovies(newFavouriteMovies);
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
