import { WebSocketServer } from "ws";
import { nanoid } from "nanoid";

const wss = new WebSocketServer({ port: 8080 });

const state = {
  messages: [],
};

wss.on("connection", (ws) => {
  const userId = nanoid();

  const event = {
    kind: "SET_STATE",
    payload: {
      state,
    },
  };
  ws.send(JSON.stringify(event));

  ws.on("message", (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE":
        const event = {
          kind: "NEW_MESSAGE",
          payload: {
            message: {
              username: `User: ${userId}`,
              avatarUrl: `https://i.pravatar.cc/300?u=${userId}`,
              timestamp: Date.now(),
              text: action.payload.text,
            },
          },
        };
        state.messages.push(event.payload.message);
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
