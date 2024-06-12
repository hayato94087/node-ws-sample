import WebSocket from "ws";
import readline from "readline";

// 接続先のURL
const url = "ws://localhost:8080";
// WebSocketクライアントを作成
const ws = new WebSocket(url);

// コマンドラインからの入力を受け付けるためのインターフェースを作成
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// open イベントは、 WebSocket のコネクションが開かれたときに発生します
ws.onopen = () => {
  console.log("Connected to the server.");
  // ユーザーからの入力を受け付けます
  promptInput();
};

// ユーザーからの入力を受け付ける関数です
function promptInput() {
  rl.question("Enter message to send: ", (message) => {
    if (message === "exit") {
      // 'exit'と入力した場合、プログラムを終了します
      rl.close();
      ws.close();
    } else {
      ws.send(message);
    }
  });
}

// onmessage イベントは、WebSocketからメッセージを受信したときに発生します。
ws.onmessage = (e) => {
  console.log(`Received: ${e.data}`);
  promptInput();
};

// onerror イベントは、WebSocketのエラーが発生したときに発生します。
ws.onerror = (error) => {
  console.error(`WebSocket Error: ${error}`);
};

// oncloseは、WebSocketのコネクションが閉じられたときに発生します。
ws.onclose = () => {
  console.log("Disconnected from the server");
  rl.close();
};