import * as react from "react";

import { styled } from "@mui/system";
import { Box, Typography } from "@material-ui/core";

import { MovieCard } from "../movie-card/movie-card";
import { IMovie } from "../../types/movie.type";

interface MovieListProps {
  movies: IMovie[];
  title?: string;
}

export const MovieList = (props: MovieListProps) => {
  const { movies, title } = props;
  return (
    <StyledMovieCollectionWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledMovieCollection>
        {movies.map((movieItem) => (
          <MovieCard key={movieItem.id} movie={movieItem} />
        ))}
      </StyledMovieCollection>
    </StyledMovieCollectionWrapper>
  );
};

const StyledMovieCollectionWrapper = styled(Box)`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StyledMovieCollection = styled(Box)`
  width: 100%;
  border-radius: 10px;
  display: flex;
  /* flex-direction: row;
  align-items: stretch; */

  gap: 15px;
  /* padding-top: 15px;
  padding-left: 50px;
  overflow-x: scroll;
  overflow-y: hidden; */
  flex-wrap: wrap;
`;

const StyledTitle = styled(Typography)`
  font-size: 24px;
  color: black;
  padding-left: 50px;
`;

// Small (smaller than 640px)
// Medium (641px to 1007px)
// Large (1008px and larger)
