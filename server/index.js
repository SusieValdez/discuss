import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data) => {
    const action = JSON.parse(data);
    console.log(action);
    switch (action.kind) {
      case "NEW_MESSAGE":
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(action));
        });
        break;
      default:
        console.error("unexpected action: " + JSON.stringify(action));
    }
  });
});
