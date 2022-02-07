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

const QrConfirmationPage = () => {
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
          <ConfirmButton>Yes, log me in</ConfirmButton>
          <CancelButton>Cancel</CancelButton>
        </div>
      </Card>
    </Container>
  );
};

export default QrConfirmationPage;
