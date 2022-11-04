import React from "react";

import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import {
  BannerMedium,
  MovieList,
  Navigation,
  BannerSmall,
  BannerLarge,
} from "../../components";
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
    handleSearch(event.target.value.trim());
  };
  if (isLoading) {
    return <StyledTitle>Loading ... </StyledTitle>;
  }

  return (
    <StyledHome device={deviceType}>
      {deviceType === "lg" && (
        <BannerLarge
          movie={popularMovies[0]}
          handleSearchInputchange={handleSearchInputchange}
        />
      )}
      {deviceType === "md" && (
        <BannerMedium
          movie={popularMovies[0]}
          handleSearchInputchange={handleSearchInputchange}
        />
      )}
      {deviceType === "sm" && (
        <BannerSmall
          movie={popularMovies[0]}
          handleSearchInputchange={handleSearchInputchange}
        />
      )}

      <Navigation />
      {searchedMovies.length >= 1 ? (
        <MovieList
          movies={
            location.pathname === "/liked" ? favouriteMovies : searchedMovies
          }
        />
      ) : (
        <MovieList
          movies={
            location.pathname === "/liked" ? favouriteMovies : popularMovies
          }
        />
      )}
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
