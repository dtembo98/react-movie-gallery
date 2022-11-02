import * as React from "react";

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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ device }) => (device === "sm" ? "5px" : "50px")};
  border-radius: 25px;
  width: ${({ device }) => (device === "sm" ? "45%" : "50%")};
  margin-bottom: 40px;
  padding: ${({ device }) => (device === "sm" ? "5px" : "10px")};
  height: 50px;
  margin: 0 auto;
`;
const StyledOption = styled(Link)<{ isactive?: boolean }>`
  display: flex;
  justify-content: center;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.primary.dark};
  font-size: 18px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.palette.primary.main};
  ${({ isactive, theme }) =>
    isactive &&
    `
    background-color: ${theme.palette.primary.main};
    .title {
      color: ${theme.palette.neutral.white};
    }
  `};

  padding: 5px;
  width: 100%;
`;

const StyledTitle = styled(Typography)`
  color: ${({ theme }) => theme.palette.neutral.black};
  font-size: 16px;
  font-weight: 400;
`;
