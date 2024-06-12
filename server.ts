import { WebSocket, WebSocketServer } from "ws";

// サーバーのポート番号
const port = 8080; 
// WebSocketサーバーを作成
const server = new WebSocketServer({ port });
// 接続中のクライアントを格納するSet
const clients = new Set<WebSocket>();

console.log(`WebSocket Server is running on port ${port}`);

// 接続が確立されたときの処理
server.on("connection", (ws) => {
  console.log("Client has connected");
  // クライアントを追加
  clients.add(ws);

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    // すべてのクライアントにメッセージをブロードキャスト
    clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`\nClient said: ${message}`);
      }
    });
  });

  // クライアントが切断されたときの処理
  ws.on("close", () => {
    console.log("Client has disconnected");
    clients.delete(ws); // クライアントを削除
  });
});