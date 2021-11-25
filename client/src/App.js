import { useState } from "react";
// Components
import Messages from "./components/Messages";
//styles
import { Container } from "./App.styles";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

const fakeMessages = [
  {
    username: "Pepa",
    avatarUrl: "https://i.pravatar.cc/300?u=1",
    timestamp: "Today at 10:00 AM",
    text: "Hello World",
  },
  {
    username: "Nachita",
    avatarUrl: "https://i.pravatar.cc/300?u=2",
    timestamp: "Today at 10:00 AM",
    text: "Hello World 2",
  },
  {
    username: "Popeye",
    avatarUrl: "https://i.pravatar.cc/300?u=3",
    timestamp: "Today at 10:00 AM",
    text: "Hello World 3",
  },
];

function App() {
  const [messages, setMessages] = useState([]);
  const addMessage = (message) => {
    setMessages(() => [...messages, message]);
  };
  const [newMessage, setNewMessage] = useState("");
  const onChangeNewMessage = (e) => {
    setNewMessage(e.target.value);
  };
  const onKeyDownNewMessage = (e) => {
    if (e.key === "Enter") {
      const action = {
        kind: "NEW_MESSAGE",
        payload: { message: newMessage },
      };
      ws.send(JSON.stringify(action));
      setNewMessage("");
    }
  };
  ws.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    console.log(event);
    switch (event.kind) {
      case "NEW_MESSAGE":
        addMessage(event.payload.message);
        break;
      default:
        console.error("unexpected event: " + JSON.stringify(event));
    }
  };

  return (
    <Container>
      <Messages messages={fakeMessages} />
    </Container>
  );
}

export default App;
