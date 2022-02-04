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
import { arrayToMap } from "./utils";
import ServerDiscoveryPage from "./pages/ServerDiscoveryPage";

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

  const onNewServer = (name) => {
    send({
      kind: "NEW_SERVER",
      payload: { name },
    });
  };

  const onEditServerSettings = (serverId, updatedServer) => {
    send({
      kind: "EDIT_SERVER",
      payload: {
        serverId,
        updatedServer,
      },
    });
  };

  const onClickDeleteServer = (serverId) => () => {
    send({
      kind: "DELETE_SERVER",
      payload: {
        serverId,
      },
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

  const onUserJoinedServer = (serverId) => {
    send({
      kind: "USER_JOINED_SERVER",
      payload: { serverId },
    });
  };

  const onUserLeftServer = (serverId) => () => {
    send({
      kind: "USER_LEFT_SERVER",
      payload: { serverId },
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

  const onEditCategory = (serverId) => (categoryId, updatedCategory) => {
    send({
      kind: "EDIT_CATEGORY",
      payload: { serverId, categoryId, updatedCategory },
    });
  };

  const onClickDeleteCategory = (serverId) => (categoryId) => {
    send({
      kind: "DELETE_CATEGORY",
      payload: { serverId, categoryId },
    });
  };

  const onClickNewChannel = (serverId) => (categoryId, name) => {
    send({
      kind: "ADD_CHANNEL",
      payload: { serverId, categoryId, name },
    });
  };

  const onEditChannel = (serverId) => (channelId, updatedChannel) => {
    send({
      kind: "EDIT_CHANNEL",
      payload: { serverId, channelId, updatedChannel },
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

  const userMap = arrayToMap(state.users);
  const localUser = userMap[state.userId];

  const serverPage = (
    <ServerPage
      servers={state.servers}
      userMap={userMap}
      localUser={localUser}
      onUserLeftServer={onUserLeftServer}
      onEditServerSettings={onEditServerSettings}
      onClickDeleteServer={onClickDeleteServer}
      onNewMessage={onNewMessage}
      onMessageEdit={onMessageEdit}
      onClickDeleteMessage={onClickDeleteMessage}
      onClickLogout={onClickLogout}
      onTypingIndicatorChanged={onTypingIndicatorChanged}
      onClickKick={onClickKick}
      onClickNewCategory={onClickNewCategory}
      onEditCategory={onEditCategory}
      onClickDeleteCategory={onClickDeleteCategory}
      onClickNewChannel={onClickNewChannel}
      onEditChannel={onEditChannel}
      onClickDeleteChannel={onClickDeleteChannel}
    />
  );

  const serverDiscoveryPage = (
    <ServerDiscoveryPage
      localUser={localUser}
      servers={state.servers}
      userMap={userMap}
      onUserJoinedServer={onUserJoinedServer}
    />
  );

  return (
    <BrowserRouter>
      <Container>
        <ServerNavbar
          servers={state.servers.filter(({ users }) =>
            users.map(({ userId }) => userId).includes(localUser._id)
          )}
          onNewServer={onNewServer}
        />
        <Routes>
          <Route index path="/" element={serverDiscoveryPage} />
          <Route path="/servers/:serverId" element={serverPage}>
            <Route path="channels/:channelId" element={serverPage} />
          </Route>
          <Route path="/server-discovery" element={serverDiscoveryPage} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
