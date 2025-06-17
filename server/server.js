const WebSocket = require("ws");
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function connection(ws) {
	console.log("Новое соединение!");
	ws.on("message", function incoming(message) {
		console.log("Получено сообщение:", message);
		ws.send(`Вы отправили: ${message}`);
	});
});

console.log("WebSocket сервер запущен на ws://localhost:8080");
