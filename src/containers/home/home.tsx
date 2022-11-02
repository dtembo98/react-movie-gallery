import React from "react";

import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import { Banner, MovieList, Navigation } from "../../components";
import {
  useFavouriteMoviesContext,
  usePopularMoviesContext,
} from "../../context";

import { useSearchMoviesContext } from "../../context/search-movies/search-movies.context";
import { useGetNetworkStatus, useGetScreenSize } from "../../hooks";

export const Home = () => {
  const { isLarge, isMedium } = useGetScreenSize();
  const location = useLocation();
  const { isLoading, popularMovies } = usePopularMoviesContext();
  const { favouriteMovies } = useFavouriteMoviesContext();
  const { handleSearch, searchedMovies } = useSearchMoviesContext();

  const deviceType = isLarge ? "lg" : isMedium ? "md" : "sm";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isOnline = useGetNetworkStatus();

  const handleSearchInputchange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleSearch(event.target.value);
  };
  if (isLoading) <StyledTitle>Loading </StyledTitle>;
  const movies =
    searchedMovies.length >= 1
      ? searchedMovies
      : location.pathname === "/liked"
      ? favouriteMovies
      : popularMovies;
  return (
    <StyledHome device={deviceType}>
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

const StyledHome = styled(Box)<{ device: "lg" | "md" | "sm" }>`
  ${(props) =>
    props.device === "lg" &&
    ` 
    width: 90%;
    margin: 0 auto;
  `};

  ${(props) =>
    props.device === "md" &&
    ` 
    width: 90%;
    margin: 0 auto;
  `};
  ${(props) =>
    props.device === "sm" &&
    ` 
    width: 100%;
    margin: 0 auto;
  `};
`;

const StyledTitle = styled(Typography)`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.neutral.black};
  text-align: center;
  margin-left: 25px;
  margin-bottom: 10px;
`;
