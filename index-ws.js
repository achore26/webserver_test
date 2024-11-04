const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.listen(3001, function () {
  console.log('Server is listening on port 3000');
});

/** Begin WebSocket Setup **/

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  const numClients = wss.clients.size;
  console.log('Clients connected:', numClients);

  wss.broadcast(`Current visitors: ${numClients}`);

  if (ws.readyState === WebSocket.OPEN) {
    ws.send('Welcome to my server');
  }

  ws.on('close', function close() {
    const numClients = wss.clients.size;
    wss.broadcast(`Current visitors: ${numClients}`);
    console.log('A client has disconnected');
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};
