import { useState } from "react";
import "./App.css";

const ws = new WebSocket(`ws://${window.location.hostname}:8080`);

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
    <div className="App">
      <header className="App-header">
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
        <input
          value={newMessage}
          onChange={onChangeNewMessage}
          onKeyDown={onKeyDownNewMessage}
        />
      </header>
    </div>
  );
}

export default App;
