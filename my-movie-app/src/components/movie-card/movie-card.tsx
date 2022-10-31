import * as react from "react";

import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";

import { imageExtractor } from "../../utils/helpers";
import { HeartIcon } from "../../assets/svgs/icons";
import { IMovie } from "../../types/movie.type";
import { useFavouriteMoviesContext } from "../../context/favourite-movies/favourite-movies.context";

interface MovieCardProps {
  movie: IMovie;
}

export const MovieCard = (props: MovieCardProps) => {
  const { movie } = props;
  const posterImageUrl = imageExtractor("posterSmall", movie?.poster_path);

  const { favouriteMovies, addToFavouriteList, removeFromFavouriteList } =
    useFavouriteMoviesContext();
  const isFavouriteMovie = favouriteMovies.find((m) => m.id === movie.id);

  const handleClick = () => {
    if (!isFavouriteMovie) {
      addToFavouriteList(movie);
    } else {
      removeFromFavouriteList(movie);
    }
  };

  if (!movie) {
    return null;
  }

  return (
    <StyledMovieCard onClick={handleClick}>
      <StyledImage src={posterImageUrl} />
      <StyledBoxWrapper>
        <StyledTitle className="MovieCard-title__p">{movie.title}</StyledTitle>
      </StyledBoxWrapper>
      <StyledIcon color={isFavouriteMovie ? "red" : "grey"} />
    </StyledMovieCard>
  );
};

const StyledMovieCard = styled(Box)`
  display: flex;
  flex-direction: column;
  transition-property: all;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: scale(1.1);
    transition-timing-function: ease-in;
    transition-duration: 0.2s;
    .MovieCard-title__p {
      color: #1b6ab3;
    }
  }
`;

const StyledImage = styled.img`
  width: 150px;
  border-radius: 10px;
`;

const StyledTitle = styled(Typography)`
  color: black;
  font-size: 16px;
  font-weight: 400;
  word-wrap: break-word;
  width: 11em;
`;

const StyledBoxWrapper = styled(Box)``;
const StyledIcon = styled(HeartIcon)<{ color?: string }>`
  position: absolute;
  fill: ${(props) => props.color};
  height: 30px;
  width: 30px;
  top: 5px;
  left: 120px;
`;
