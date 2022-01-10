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
  const [serverName, setServerName] = useState(undefined);
  const [roles, setRoles] = useState(undefined);
  const [users, setUsers] = useState(undefined);
  const activeChannelName = "chat";

  const addMessage = (message) => {
    setMessages(() => [...messages, message]);
  };

  const addUser = (user) => {
    setUsers((users) => ({ ...users, [user.id]: user }));
  };

  const removeUser = (userId) => {
    setUsers((users) =>
      Object.values(users)
        .filter((u) => u.id !== userId)
        .reduce((users, u) => ({ ...users, [u.id]: u }), {})
    );
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
        setServerName(() => event.payload.state.name);
        setRoles(() => event.payload.state.roles);
        setUsers(() => event.payload.state.users);
        break;
      case "USER_JOINED":
        addUser(event.payload.user);
        break;
      case "USER_LEFT":
        removeUser(event.payload.userId);
        break;
      default:
        console.error("unexpected event: " + JSON.stringify(event));
    }
  };

  if (!users || !roles) {
    return <div>loading...</div>;
  }

  return (
    <Container>
      <Sidebar serverName={serverName} categories={categories} />
      <Chat
        activeChannelName={activeChannelName}
        messages={messages}
        onNewMessage={onNewMessage}
        roles={roles}
        users={users}
      />
    </Container>
  );
}

export default App;
