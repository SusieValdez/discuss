import { React, useState } from "react";
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

const RegisterPage = ({ onClickRegister }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const onClickRegisterButton = () => {
    if (username === "") {
      return;
    }
    if (email === "") {
      return;
    }
    if (password === "") {
      return;
    }
    if (date === "") {
      return;
    }
    if (month === "") {
      return;
    }
    if (year === "") {
      return;
    }
    onClickRegister({
      username,
      email,
      password,
      dateOfBirth: `${year}-${month}-${date}`,
    });
  };

  const onChange = (setFn) => (e) => setFn(e.target.value);

  return (
    <Container background={backgroundDrop}>
      <Card>
        <Header>
          <h3>Create an account</h3>
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
          <h5>Username</h5>
          <input
            name="username"
            type="text"
            placeholder=""
            value={username}
            onChange={onChange(setUsername)}
          />
          <h5>Password</h5>
          <input
            name="password"
            type="password"
            placeholder=""
            value={password}
            onChange={onChange(setPassword)}
          />
          <h5>Date of birth</h5>
          <SelectMenu>
            <select
              name="date"
              value={date}
              onChange={onChange(setDate)}
              required
            >
              <option value="" disabled hidden>
                Select
              </option>
              {Array.from({ length: 31 }).map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select name="month" value={month} onChange={onChange(setMonth)}>
              <option value="" disabled hidden>
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
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select name="year" value={year} onChange={onChange(setYear)}>
              <option value="" disabled hidden>
                Select
              </option>
              {Array.from({ length: 150 }).map((_, i) => (
                <option key={i} value={2019 - i}>
                  {2019 - i}
                </option>
              ))}
            </select>
          </SelectMenu>
          <button onClick={onClickRegisterButton}>Continue</button>
          <Link to="/login">Already have an account?</Link>
        </InputField>
        <p>
          By registering you accept Discuss's <a href="/">Terms of Service</a>{" "}
          and <a href="/">Private Policy</a>
        </p>
      </Card>
    </Container>
  );
};

export default RegisterPage;
