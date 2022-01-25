import { React } from "react";
// Styles
import {
  Container,
  Card,
  Header,
  AccountInfo,
  InputField,
  QrLogin,
  QrContainer,
} from "./LoginPage.styles";
import QRCode from "qrcode.react";
import backgroundDrop from "../../assets/backdrop.jpg";

const LoginPage = () => {
  return (
    <Container background={backgroundDrop}>
      <Card>
        <AccountInfo>
          <Header>
            <h3>Welcome back!</h3>
            <p>We are so excited to see you again!</p>
          </Header>
          <InputField>
            <h5>Username</h5>
            <input name="username" type="text" placeholder="" />
            <h5>Password</h5>
            <input name="password" type="password" placeholder="" />
          </InputField>
          <p>
            <a>Forgot your password?</a>
          </p>
          <button>Login</button>
          <p>
            Need an account?
            <a href=""> Register</a>
          </p>
        </AccountInfo>
        <QrLogin>
          <QrContainer>
            <QRCode value="http://facebook.github.io/react/" />
          </QrContainer>
          <h3>Login with QR Code</h3>
          <p>
            Scan this with the <strong>Discuss mobile app</strong> to log in
            instantly.
          </p>
        </QrLogin>
      </Card>
    </Container>
  );
};

export default LoginPage;
