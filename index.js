const WebSocket = require('ws');

let port = process.env.PORT || 8080;

// Create a WebSocket server
const wss = new WebSocket.Server({ port });

wss.on('connection', ws => {
    console.log('New client connected');

    // Handle incoming messages from clients
    ws.on('message', message => {
        // Parse the incoming message as JSON
        const data = JSON.parse(message);

        // Broadcast the message to all connected clients except the sender
        wss.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(data));
            }
        });
    });

    // Handle client disconnection
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

console.log('Signaling server is running on ws://localhost:8080');
