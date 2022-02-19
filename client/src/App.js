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
import { arrayToMap } from "./utils";
import ServerDiscoveryPage from "./pages/ServerDiscoveryPage";
import ServerInvitePage from "./pages/ServerInvitePage";
import QrConfirmationPage from "./pages/QrConfirmationPage";
import useWsActions from "./useWsActions";

function App() {
  const [state, dispatch] = useReducer(reducer, undefined);
  const [cookie, setCookie] = useState(localStorage.getItem("cookie"));
  const [loginCode, setLoginCode] = useState(undefined);
  const [loginCodeStatus, setLoginCodeStatus] = useState("not-started");
  const actions = useWsActions(dispatch, {
    state,
    cookie,
    setLoginCode,
    setLoginCodeStatus,
    setCookie,
  });

  const onClickLogout = () => {
    actions.logout();
    localStorage.removeItem("cookie");
    setCookie(undefined);
  };

  if (!cookie) {
    return (
      <BrowserRouter>
        <Container>
          <Routes>
            <Route
              path="/login"
              element={<LoginPage onClickLogin={actions.onClickLogin} />}
            />
            <Route
              path="/register"
              element={
                <RegisterPage onClickRegister={actions.onClickRegister} />
              }
            />
            <Route
              path="*"
              element={
                <LoginPage
                  onClickLogin={actions.onClickLogin}
                  loginCode={loginCode}
                />
              }
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
      users={state.users}
      localUser={localUser}
      onClickLogout={onClickLogout}
      {...actions}
    />
  );

  const serverDiscoveryPage = (
    <ServerDiscoveryPage
      localUser={localUser}
      servers={state.servers}
      userMap={userMap}
      onUserJoinedServer={actions.onUserJoinedServer}
      onEditUserAccount={actions.onEditUserAccount}
      onClickLogout={onClickLogout}
      onChangeOnlineStatus={actions.onChangeOnlineStatus}
    />
  );

  return (
    <BrowserRouter>
      <Container>
        <ServerNavbar
          servers={state.servers.filter(({ users }) =>
            users.map(({ userId }) => userId).includes(localUser._id)
          )}
          onNewServer={actions.onNewServer}
        />
        <Routes>
          <Route index path="/" element={serverDiscoveryPage} />
          <Route path="/servers/:serverId" element={serverPage}>
            <Route path="channels/:channelId" element={serverPage} />
          </Route>
          <Route path="/server-discovery" element={serverDiscoveryPage} />
          <Route
            path="/invite/:inviteCode"
            element={
              <ServerInvitePage
                servers={state.servers}
                localUser={localUser}
                userMap={userMap}
                onAcceptInvite={actions.onUserJoinedServer}
              />
            }
          />
          <Route
            path="/qr-confirm/:loginCode"
            element={
              <QrConfirmationPage
                confirmLoginCode={actions.confirmLoginCode}
                loginCodeStatus={loginCodeStatus}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
