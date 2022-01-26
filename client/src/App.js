import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./App.styles";
// Components
import ServerPage from "./pages/ServerPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import reducer from "./reducer";
import ServerNavbar from "./components/ServerNavbar/ServerNavbar";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

function App() {
  const ws = useRef(new WebSocket(`ws://${window.location.hostname}:8080`));
  const [state, dispatch] = useReducer(reducer, undefined);
  const [cookie, setCookie] = useState(localStorage.getItem("cookie"));

  const send = (action) => {
    ws.current.send(JSON.stringify(action));
  };

  useEffect(() => {
    if (!cookie) {
      return;
    }
    ws.current.onopen = () => {
      send({
        kind: "VERIFY_COOKIE",
        payload: {
          cookie,
        },
      });
    };
  }, [cookie]);

  const onClickRegister = (payload) => {
    send({
      kind: "REGISTER",
      payload,
    });
  };

  const onClickLogin = (payload) => {
    send({
      kind: "LOGIN",
      payload,
    });
  };

  const onNewMessage = (serverId, channelId) => (text) => {
    send({
      kind: "NEW_MESSAGE",
      payload: { text, serverId, channelId },
    });
  };

  const onClickLogout = () => {
    localStorage.removeItem("cookie");
    setCookie(undefined);
  };

  ws.current.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    console.log(event);
    if (!cookie && event.kind === "SET_STATE") {
      localStorage.setItem("cookie", event.payload.cookie);
      setCookie(event.payload.cookie);
    }
    dispatch(event);
  };

  if (!cookie) {
    return (
      <BrowserRouter>
        <Container>
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onClickLogin={onClickLogin} />}
            />
            <Route
              path="/register"
              element={<RegisterPage onClickRegister={onClickRegister} />}
            />
            <Route
              path="*"
              element={<LoginPage onClickLogin={onClickLogin} />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    );
  }

  if (!state) {
    return <div>loading...</div>;
  }

  const serverPage = (
    <ServerPage
      servers={state.servers}
      users={state.users}
      onNewMessage={onNewMessage}
      localUserId={state.userId}
      onClickLogout={onClickLogout}
    />
  );

  return (
    <BrowserRouter>
      <Container>
        <ServerNavbar servers={state.servers} />
        <Routes>
          <Route path="/">
            <Route path="servers/:serverId" element={serverPage}>
              <Route path="channels/:channelId" element={serverPage} />
            </Route>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
