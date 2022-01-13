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

  const onNewMessage = (channelId) => (text) => {
    const action = {
      kind: "NEW_MESSAGE",
      payload: { text, channelId },
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

  return (
    <BrowserRouter>
      <Container>
        <ServerNavbar />
        <Routes>
          <Route path="/">
            <Route
              path="channels/:channelId"
              element={<ServerPage {...state} onNewMessage={onNewMessage} />}
            />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
