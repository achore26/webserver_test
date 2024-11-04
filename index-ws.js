const express = require('express');
const server = require('http').createServer();
const app = express();


app.get('/', function(req, res) {
res.sendFile('index.html',{root: __dirname});
});

server.on('request', app);
server.listen(3000, function () {console.log('listening on 3000'); });

/**Begin web sockets */

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server}); /*attach the server we created above*/

wss.on('connection', function connection(ws){
    /*will run function everytime it connects to a new server*/
    const numClients = wss.clients.size;
    console.log('clients connected', numClients);

    wss.broadcast(`Current visitors ${numClients}`);/*it broadcats whenever new client connects*/

    /* handle the socket states*/
    if (ws.readyState === ws.OPEN){
        ws.send('Welcome to my server');
    }
    ws.on('close', function close() {
        wss.broadcast(`Current visitors: ${numClients}`);
        console.log('A lient has disconnected');
    });

});

wss.broadcast = function broadcast(data){
    wss.clients.forEach(function each(client){
        client.send(data);
    });
}