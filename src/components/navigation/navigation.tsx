import * as react from "react";

import { Box, Typography } from "@material-ui/core";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { useGetActiveRoute, useGetScreenSize } from "../../hooks";

export const Navigation = () => {
  const { isLikedRoute, isPopularMovie, handleRouteChange } =
    useGetActiveRoute();
  const { isLarge, isMedium } = useGetScreenSize();
  const deviceType = isLarge ? "lg" : isMedium ? "md" : "sm";

  return (
    <StyledBoxWrapper device={deviceType}>
      <StyledOption className="selected" isactive={isPopularMovie} to="/">
        <StyledTitle onClick={() => handleRouteChange("/")} className="title">
          Popular Movies
        </StyledTitle>
      </StyledOption>
      <StyledOption className="selected" isactive={isLikedRoute} to="/liked">
        <StyledTitle
          onClick={() => handleRouteChange("/liked")}
          className="title">
          My liked Movies
        </StyledTitle>
      </StyledOption>
    </StyledBoxWrapper>
  );
};

const StyledBoxWrapper = styled(Box)<{ device: "lg" | "md" | "sm" }>`
  ${(props) =>
    props.device === "lg" &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
    border-radius: 25px;
    width: 50%;
    margin-bottom: 40px;
    padding: 10px;
    height: 50px;
    margin: 0 auto;
    text-align: center
  `};

  ${(props) =>
    props.device === "md" &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
 
    border-radius: 25px;
    width: 50%;
    margin-bottom: 40px;
    padding: 10px;
    height: 50px;
    margin: 0 auto;
    text-align: center
  `};

  ${(props) =>
    props.device === "sm" &&
    `
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border-radius: 25px;
    width: 50%;
    margin-bottom: 40px;
    padding: 5px;
    height: 50px;
    margin: 0 auto;
    text-align: center;
   
  `};
`;
const StyledOption = styled(Link)<{ isactive?: boolean }>`
  text-decoration: none;
  color: #052440;
  font-size: 18px;
  border-radius: 20px;
  border: 1px solid #1b6ab3;
  ${(props) =>
    props.isactive &&
    `
    background-color: #1b6ab3;
    .title {
      color: #fff;
    }
  `};

  padding: 5px;
  width: 100%;
`;

const StyledTitle = styled(Typography)`
  color: black;
  font-size: 16px;
  font-weight: 400;
  word-wrap: break-word;
  width: 11em;
`;
