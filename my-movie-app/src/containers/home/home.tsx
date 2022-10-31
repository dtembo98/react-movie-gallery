import React from "react";

import { Banner, MovieList, Navigation } from "../../components";
import { Box } from "@material-ui/core";
import styled from "styled-components";
import {
  useFavouriteMoviesContext,
  usePopularMoviesContext,
} from "../../context";
import { useLocation } from "react-router-dom";
import { useSearchMoviesContext } from "../../context/search-movies/search-movies.context";

export const Home = () => {
  const location = useLocation();
  const { isLoading, error, popularMovies } = usePopularMoviesContext();
  const { favouriteMovies } = useFavouriteMoviesContext();
  const { handleSearch, searchedMovies } = useSearchMoviesContext();
  console.log("searchedMovies", searchedMovies);

  const handleSearchInputchange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleSearch(event.target.value);
  };

  const movies =
    searchedMovies.length >= 1
      ? searchedMovies
      : location.pathname === "/liked"
      ? favouriteMovies
      : popularMovies;
  return (
    <StyledHome>
      <Banner
        movie={popularMovies[0]}
        handleSearchInputchange={handleSearchInputchange}
      />
      <Navigation />
      <MovieList movies={movies} />
    </StyledHome>
  );
};

const StyledHome = styled(Box)`
  width: 90%;
  margin: 0 auto;
`;
