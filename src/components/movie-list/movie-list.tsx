import * as react from "react";

import { styled } from "@mui/system";
import { Box, Typography } from "@material-ui/core";

import { MovieCard } from "../movie-card/movie-card";
import { IMovie } from "../../types/movie.type";
import { useGetScreenSize } from "../../hooks";

interface MovieListProps {
  movies: IMovie[];
  title?: string;
}

export const MovieList = (props: MovieListProps) => {
  const { isLarge, isMedium } = useGetScreenSize();
  const deviceType = isLarge ? "lg" : isMedium ? "md" : "sm";

  const { movies, title } = props;
  return (
    <StyledMovieCollectionWrapper>
      <StyledTitle>{title}</StyledTitle>
      <StyledMovieCollection device={deviceType}>
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
  align-items: center;
`;

const StyledMovieCollection = styled(Box)<{ device: "sm" | "md" | "lg" }>`
  ${(props) =>
    props.device === "lg" &&
    `width: 100%;
     border-radius: 10px;
     display: flex;
     gap: 15px;
     flex-wrap: wrap;
  `};

  ${(props) =>
    props.device === "md" &&
    `display: grid;
     grid-template-columns: repeat(4, 1fr);
     gap: 10px;
     align-items: center;
     justify-content: center;
  `};

  ${(props) =>
    props.device === "sm" &&
    ` 
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 5px;
    grid-row-gap: 10px;
    align-items: center;
    justify-items: center;
  `};
`;

const StyledTitle = styled(Typography)`
  font-size: 24px;
  color: black;
  align-self: flex-start;
  margin-left: 25px;
`;
