import { useReducer } from "react";
// Components
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
// Styles
import { Container } from "./App.styles";
import reducer from "./reducer";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

function App() {
  const [state, dispatch] = useReducer(reducer, undefined);
  const activeChannelName = "chat";

  const onNewMessage = (text) => {
    const action = {
      kind: "NEW_MESSAGE",
      payload: { text },
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
    <Container>
      <Sidebar serverName={state.name} categories={state.categories} />
      <Chat
        activeChannelName={activeChannelName}
        messages={state.messages}
        onNewMessage={onNewMessage}
        roles={state.roles}
        users={state.users}
      />
    </Container>
  );
}

export default App;
