import * as react from "react";

import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";

import { imageExtractor } from "../../utils/helpers";
import { IMovie } from "../../types/movie.type";

interface BannerProps {
  movie: IMovie;
  handleSearchInputchange?: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

export const Banner = (props: BannerProps) => {
  const { movie, handleSearchInputchange } = props;
  const heroImageUrl = imageExtractor("backdropLarge", movie?.backdrop_path);

  return (
    <StyledBanner img_url={heroImageUrl}>
      <StyledBannerContent>
        <StyledTitle variant="h4">Welcome.</StyledTitle>
        <StyledTitle variant="h6">
          Millions of movies, TV shows and people to discover.
        </StyledTitle>
      </StyledBannerContent>
      <StyledSearchBar
        onChange={handleSearchInputchange}
        placeholder="Search movie ..."
      />
    </StyledBanner>
  );
};

const StyledBanner = styled(Box)<{ img_url?: string }>`
  height: 400px;
  margin-bottom: 24px;
  background: linear-gradient(
      to right,
      rgba(5, 40, 58, 0.5),
      rgba(5, 42, 60, 0.5)
    ),
    url(${(props) => props.img_url});

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;

  justify-content: center;
  padding-left: 55px;
  padding-right: 55px;
  flex-direction: column;
`;

const StyledBannerContent = styled(Box)`
  margin-bottom: 24px;
`;

const StyledTitle = styled(Typography)``;

const StyledSearchBar = styled("input")`
  padding: 10px;
  width: 100%;
  display: flex;
  border: none;
  border-radius: 30px;
  align-items: center;
  outline: none;
  color: #b8b6b6;
  font-size: 18px;
  justify-content: center;
`;
