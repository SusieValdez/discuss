import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE":
        const event = {
          kind: "NEW_MESSAGE",
          payload: {
            message: {
              username: "Tom",
              avatarUrl: "https://i.pravatar.cc/300?u=5",
              timestamp: "Today at 1:52 PM",
              text: action.payload.text,
            },
          },
        };
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(event));
        });
        break;
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
