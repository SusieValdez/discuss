import { useReducer } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "./App.styles";
// Components
import ServerPage from "./pages/ServerPage";
import reducer from "./reducer";
import ServerNavbar from "./components/ServerNavbar/ServerNavbar";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

function App() {
  const [state, dispatch] = useReducer(reducer, undefined);

  const onNewMessage = (serverId, channelId) => (text) => {
    const action = {
      kind: "NEW_MESSAGE",
      payload: { text, serverId, channelId },
    };
    ws.send(JSON.stringify(action));
  };

  ws.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    console.log(event);
    dispatch(event);
  };

  if (!state) {
    return <div>loading...</div>;
  }

  const serverPage = (
    <ServerPage
      servers={state.servers}
      users={state.users}
      onNewMessage={onNewMessage}
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
