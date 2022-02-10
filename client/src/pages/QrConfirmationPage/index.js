import React from "react";
// Styles
import {
  Container,
  Card,
  ConfirmButton,
  CancelButton,
} from "./QrConfirmationPage.styles";
// Assets
import backgroundDrop from "../../assets/login-background.svg";
import { useNavigate, useParams } from "react-router-dom";

const QrConfirmationPage = ({ confirmLoginCode, loginCodeStatus }) => {
  const { loginCode } = useParams();
  const navigate = useNavigate();

  switch (loginCodeStatus) {
    case "not-started": {
      return (
        <Container background={backgroundDrop}>
          <Card>
            <div>
              <h3>Are you trying to log in on the computer?</h3>
              <p>
                Only scan QR codes taken directly from your browser. Never use a
                code sent to youby another user.
              </p>
            </div>
            <div>
              <ConfirmButton onClick={confirmLoginCode(loginCode)}>
                Yes, log me in
              </ConfirmButton>
              <CancelButton onClick={() => navigate("/", { replace: true })}>
                Cancel
              </CancelButton>
            </div>
          </Card>
        </Container>
      );
    }
    case "pending": {
      return (
        <Container background={backgroundDrop}>
          <Card>
            <div>
              <h3>Logging in...</h3>
              <p>Waiting for a response from the server...</p>
            </div>
          </Card>
        </Container>
      );
    }
    case "successful": {
      return (
        <Container background={backgroundDrop}>
          <Card>
            <div>
              <h3>Logged in!</h3>
              <p>
                You should now be logged in on your desktop! Enjoy using
                Discuss!
              </p>
            </div>
            <div>
              <ConfirmButton onClick={() => navigate("/", { replace: true })}>
                Okay
              </ConfirmButton>
            </div>
          </Card>
        </Container>
      );
    }
    default: {
      console.error("invalid login code status:", loginCodeStatus);
      return <></>;
    }
  }
};

export default QrConfirmationPage;
