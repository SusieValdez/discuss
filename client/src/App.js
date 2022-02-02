import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./App.styles";
// Components
import ServerPage from "./pages/ServerPage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import reducer from "./reducer";
import ServerNavbar from "./components/ServerNavbar/ServerNavbar";
import { useState } from "react";
import { useEffect } from "react";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

function App() {
  const [state, dispatch] = useReducer(reducer, undefined);
  const [cookie, setCookie] = useState(localStorage.getItem("cookie"));

  const send = (action) => {
    ws.send(JSON.stringify(action));
  };

  useEffect(() => {
    if (!cookie) {
      return;
    }
    ws.onopen = () => {
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

  const onMessageEdit = (serverId, channelId) => (messageId) => (text) => {
    send({
      kind: "EDIT_MESSAGE",
      payload: { serverId, channelId, messageId, text },
    });
  };

  const onClickDeleteMessage = (serverId, channelId) => (messageId) => () => {
    send({
      kind: "DELETE_MESSAGE",
      payload: { serverId, channelId, messageId },
    });
  };

  const onTypingIndicatorChanged = (serverId, channelId) => (typingStatus) => {
    send({
      kind: "TYPING_INDICATOR_CHANGED",
      payload: { serverId, channelId, typingStatus },
    });
  };

  const onClickKick = (serverId) => (userId) => () => {
    send({
      kind: "KICK_USER",
      payload: { serverId, userId },
    });
  };

  const onClickNewCategory = (serverId) => (name) => {
    send({
      kind: "ADD_CATEGORY",
      payload: { serverId, name },
    });
  };

  const onClickNewChannel = (serverId) => (categoryId, name) => {
    send({
      kind: "ADD_CHANNEL",
      payload: { serverId, categoryId, name },
    });
  };

  const onClickDeleteChannel = (serverId) => (channelId) => {
    send({
      kind: "DELETE_CHANNEL",
      payload: { serverId, channelId },
    });
  };

  const onClickLogout = () => {
    localStorage.removeItem("cookie");
    setCookie(undefined);
  };

  ws.onmessage = ({ data }) => {
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
      localUserId={state.userId}
      onNewMessage={onNewMessage}
      onMessageEdit={onMessageEdit}
      onClickDeleteMessage={onClickDeleteMessage}
      onClickLogout={onClickLogout}
      onTypingIndicatorChanged={onTypingIndicatorChanged}
      onClickKick={onClickKick}
      onClickDeleteChannel={onClickDeleteChannel}
      onClickNewCategory={onClickNewCategory}
      onClickNewChannel={onClickNewChannel}
    />
  );

  return (
    <BrowserRouter>
      <Container>
        <ServerNavbar servers={state.servers} />
        <Routes>
          <Route path="/servers/:serverId" element={serverPage}>
            <Route path="channels/:channelId" element={serverPage} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
