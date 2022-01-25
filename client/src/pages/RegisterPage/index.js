import React from "react";
import { Link } from "react-router-dom";

// Styles
import {
  Container,
  Card,
  Header,
  InputField,
  SelectMenu,
} from "./RegisterPage.styles";
// Assets
import backgroundDrop from "../../assets/backdrop.jpg";

const RegisterPage = () => {
  return (
    <Container background={backgroundDrop}>
      <Card>
        <Header>
          <h3>Create an account</h3>
        </Header>
        <InputField>
          <h5>Email</h5>
          <input name="email" type="text" placeholder="" />
          <h5>Username</h5>
          <input name="username" type="text" placeholder="" />
          <h5>Password</h5>
          <input name="password" type="password" placeholder="" />
          <h5>Date of birth</h5>
          <SelectMenu>
            <select name="date" value="" required>
              <option value="" disabled selected hidden>
                Select
              </option>
              {Array.from({ length: 31 }).map((_, i) => (
                <option>{i + 1}</option>
              ))}
            </select>
            <select name="month" value="">
              <option value="" disabled selected hidden>
                Select
              </option>
              {[
                "January",
                "February",
                "March",
                "April",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option>{month}</option>
              ))}
            </select>
            <select name="year" value="">
              <option value="" disabled selected hidden>
                Select
              </option>
              {Array.from({ length: 150 }).map((_, i) => (
                <option>{2019 - i}</option>
              ))}
            </select>
          </SelectMenu>
          <button>Login</button>
          <Link to="/login">
            <p>
              <a>Already have an account?</a>
            </p>
          </Link>
        </InputField>
        <p>
          By registering you accept Discuss's <a>Terms of Service</a> and{" "}
          <a>Private Policy</a>
        </p>
      </Card>
    </Container>
  );
};

export default RegisterPage;
