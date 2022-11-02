import { Box } from "@material-ui/core";
import styled from "styled-components";

export const Error = () => {
  return (
    <StyledNotFoundContainer>
      <StyledErrorTitle>Error</StyledErrorTitle>
      <StyledErrorDescription>
        Sometimes, we have to say no so you don’t think we're easy. Please come
        back in an hour!
      </StyledErrorDescription>
      <StyledErrorCode>404</StyledErrorCode>
      <StyledErrorCode>page not found</StyledErrorCode>
    </StyledNotFoundContainer>
  );
};

const StyledNotFoundContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
