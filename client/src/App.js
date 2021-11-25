import { useState } from "react";
// Components
import Messages from "./components/Messages";
import NewMessageInput from "./components/NewMessageInput";
//styles
import { Container } from "./App.styles";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (message) => {
    setMessages(() => [...messages, message]);
  };

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
    switch (event.kind) {
      case "NEW_MESSAGE":
        addMessage(event.payload.message);
        break;
      case "SET_STATE":
        setMessages(event.payload.state.messages);
        break;
      default:
        console.error("unexpected event: " + JSON.stringify(event));
    }
  };

  return (
    <Container>
      <Messages messages={messages} />
      <NewMessageInput onNewMessage={onNewMessage} />
    </Container>
  );
}

export default App;
