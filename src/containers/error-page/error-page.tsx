import { Box } from "@material-ui/core";
import styled from "styled-components";

export const ErrorPage = () => {
  return (
    <StyledNotFoundContainer>
      <StyledErrorTitle>Error</StyledErrorTitle>
      <StyledErrorDescription>
        Sorry, Something went wrong please try again later
      </StyledErrorDescription>
      <StyledErrorCode>Try to reload</StyledErrorCode>
    </StyledNotFoundContainer>
  );
};

const StyledNotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const StyledErrorTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const StyledErrorDescription = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StyledErrorCode = styled.p`
  font-size: 10px;
  font-weight: 700;
`;
