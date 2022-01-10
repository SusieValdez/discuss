import { useState } from "react";
// Components
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
// Styles
import { Container } from "./App.styles";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

function App() {
  const [messages, setMessages] = useState([]);
  const [categories, setCategories] = useState([]);

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
        setMessages(() => event.payload.state.messages);
        setCategories(() =>
          event.payload.state.categories.map((cat) => ({
            ...cat,
            channels: cat.channels.map((c) =>
              c.name.toLowerCase() === "chat" ? { ...c, isActive: true } : c
            ),
          }))
        );
        break;
      default:
        console.error("unexpected event: " + JSON.stringify(event));
    }
  };

  return (
    <Container>
      <Sidebar categories={categories} />
      <Chat messages={messages} onNewMessage={onNewMessage} />
    </Container>
  );
}

export default App;
