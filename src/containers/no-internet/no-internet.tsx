import { Box, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useGetNetworkStatus } from "../../hooks";

export const NoInternet = () => {
  const navigate = useNavigate();
  const isOnline = useGetNetworkStatus();

  const handleReloadClick = () => {
    if (!isOnline) {
      navigate("/");
    }
  };

  return (
    <StyledNoInternet>
      <StyledImage src={require("../../assets/icons8-disconnected-100.png")} />
      <StyledMessage>
        Check your internet connection and try again.
      </StyledMessage>
      <StyledButton variant="outlined" onClick={handleReloadClick}>
        Reload page
      </StyledButton>
    </StyledNoInternet>
  );
};

const StyledNoInternet = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledImage = styled("img")`
  width: 100px;
  margin-bottom: 10px;
`;

const StyledMessage = styled("p")`
  color: #777;
  margin-bottom: 30px;
`;

const StyledButton = styled(Button)`
  color: #fff;
  background-color: #032541;
  border: none;
  border-radius: 20px;
  margin-top: 35px;
  padding: 10px 15px;

  &:hover {
    color: #01192c;
  }
`;
