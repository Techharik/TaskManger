import WebSocket, { WebSocketServer } from "ws";
import http, { type IncomingMessage } from "http";
import url from "url";

const clients = new Map<string, any>();

export function setupWebSocket(server: http.Server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req: IncomingMessage) => {
    const parsed = url.parse(req.url!, true);
    const userId = parsed.query.userId as string;

    if (!userId) {
      ws.close();
      return;
    }

    // store connection
    clients.set(userId, ws);

    console.log("WS connected:", userId);

    ws.on("close", () => {
      clients.delete(userId);
      console.log("WS disconnected:", userId);
    });
  });
}

// 🔥 send function (used in services)
export function sendNotification(userId: string, data: any) {
  const ws = clients.get(userId);

  if (ws && ws.readyState === ws.OPEN) {
    ws.send(JSON.stringify(data));
  }
}
