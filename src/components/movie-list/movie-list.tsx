import * as React from "react";

import { Box, Button, Typography } from "@material-ui/core";
import styled from "styled-components";

import { MovieCard } from "../movie-card/movie-card";
import { IMovie } from "../../types/movie.type";
import { useGetScreenSize } from "../../hooks";
import { usePopularMoviesContext } from "../../context";
import { useSearchMoviesContext } from "../../context/search-movies/search-movies.context";

interface MovieListProps {
  movies: IMovie[];
  title?: string;
}

const DEVICE_SIZES = {
  lg: 6,
  md: 4,
  sm: 2,
};

export const MovieList = (props: MovieListProps) => {
  const { isMedium, isSmall } = useGetScreenSize();
  const { setPage, page } = usePopularMoviesContext();
  const { searchedMovies } = useSearchMoviesContext();
  const deviceType = isSmall ? "sm" : isMedium ? "md" : "lg";

  const handleLoadMoreClick = () => {
    setPage(page + 1);
  };

  const { movies } = props;
  return (
    <StyledMovieCollectionWrapper>
      <StyledMovieCollection device={deviceType}>
        {movies?.map((movieItem) => (
          <MovieCard key={movieItem?.id} movie={movieItem} />
        ))}
      </StyledMovieCollection>
      {movies.length === 0 && <StyledTitle>No movies found</StyledTitle>}

      {movies.length >= 1 && (
        <StyledButton variant="outlined" onClick={handleLoadMoreClick}>
          Load More
        </StyledButton>
      )}
    </StyledMovieCollectionWrapper>
  );
};

const StyledMovieCollectionWrapper = styled(Box)`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const StyledMovieCollection = styled(Box)<{
  isLarge?: boolean;
  isMedium?: boolean;
  isSmall?: boolean;
  device: "sm" | "md" | "lg";
}>`
  width: 90%;
  display: grid;
  grid-template-columns: repeat(${({ device }) => DEVICE_SIZES[device]}, 1fr);
  margin-bottom: 50px;
  grid-gap: 20px;
`;

const StyledTitle = styled(Typography)`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.neutral.black};
  text-align: center;
  margin-left: 25px;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  color: ${({ theme }) => theme.palette.primary.main};
  background-color: ${({ theme }) => theme.palette.primary.main};
`;
