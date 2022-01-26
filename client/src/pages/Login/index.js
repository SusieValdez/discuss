import { React, useState } from "react";
import { Link, Outlet } from "react-router-dom";
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
import backgroundDrop from "../../assets/login-background.svg";

const LoginPage = ({ onClickLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (setFn) => (e) => setFn(e.target.value);

  const onClickLoginButton = () => {
    if (email === "") {
      return;
    }
    if (password === "") {
      return;
    }
    onClickLogin({ email, password });
  };

  return (
    <Container background={backgroundDrop}>
      <Card>
        <AccountInfo>
          <Header>
            <h3>Welcome back!</h3>
            <p>We are so excited to see you again!</p>
          </Header>
          <InputField>
            <h5>Email</h5>
            <input
              name="email"
              type="text"
              placeholder=""
              value={email}
              onChange={onChange(setEmail)}
            />
            <h5>Password</h5>
            <input
              name="password"
              type="password"
              placeholder=""
              value={password}
              onChange={onChange(setPassword)}
            />
          </InputField>
          <p>
            <a href="/">Forgot your password?</a>
          </p>
          <button onClick={onClickLoginButton}>Login</button>
          <p>
            Need an account?
            <Link to="/register"> Register</Link>
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
      <Outlet />
    </Container>
  );
};

export default LoginPage;
