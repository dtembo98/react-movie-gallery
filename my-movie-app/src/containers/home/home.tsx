import React from "react";

import { Banner, MovieList, Navigation } from "../../components";

import { Box } from "@material-ui/core";
import styled from "styled-components";
import {
  useFavouriteMoviesContext,
  usePopularMoviesContext,
} from "../../context";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchMoviesContext } from "../../context/search-movies/search-movies.context";
import { useGetNetworkStatus } from "../../hooks";

export const Home = () => {
  const isOnline = useGetNetworkStatus();

  const location = useLocation();
  const { isLoading, error, popularMovies } = usePopularMoviesContext();
  const { favouriteMovies } = useFavouriteMoviesContext();
  const { handleSearch, searchedMovies } = useSearchMoviesContext();

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
      <MovieList
        title={
          location.pathname === "/liked" ? "Liked Movies" : "Popular Movies"
        }
        movies={movies}
      />
    </StyledHome>
  );
};

const StyledHome = styled(Box)`
  width: 90%;
  margin: 0 auto;
`;
