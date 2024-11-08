const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const sqlite = require('sqlite3');

const app = express();
const server = http.createServer(app);
const db = new sqlite.Database('visitors.db');

// Serve the static HTML file
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

server.listen(3000, () => {
  console.log('Server started on port 3000');
});

/** WebSocket Setup **/
const wss = new WebSocket.Server({ server });

// Broadcast function for WebSocket messages
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// Function to handle new WebSocket connections
wss.on('connection', (ws) => {
  const numClients = wss.clients.size;
  console.log('Clients connected:', numClients);

  wss.broadcast(`Current visitors: ${numClients}`);
  if (ws.readyState === WebSocket.OPEN) {
    ws.send('Welcome to my server');
  }

  // Insert visitor count into the database
  db.run(`INSERT INTO visitors (count, time) VALUES (?, datetime('now'))`, [numClients], (err) => {
    if (err) {
      console.error('Database insert error:', err);
    }
  });

  ws.on('close', () => {
    console.log('A client has disconnected');
    const updatedNumClients = wss.clients.size;
    wss.broadcast(`Current visitors: ${updatedNumClients}`);
  });
});

/** Database Setup **/
function initializeDatabase() {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS visitors (
        count INTEGER,
        time TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err);
      } else {
        console.log('Database table created or exists already.');
      }
    });
  });
}

// Function to print visitor counts from the database
function getCounts() {
  db.each("SELECT * FROM visitors", (err, row) => {
    if (err) {
      console.error('Database read error:', err);
    } else {
      console.log(row);
    }
  });
}

// Function to cleanly shut down the database and server
function shutdown() {
  console.log('Shutting down...');
  getCounts();

  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database closed');
    }
    process.exit(0);
  });
}

// Signal handling for graceful shutdown
process.on('SIGINT', () => {
  console.log('SIGINT received. Closing connections...');

  wss.clients.forEach((client) => {
    client.close(1000, 'Server is shutting down', (err) => {
      if (err) console.error('Error closing WebSocket client:', err);
    });
  });

  server.close(() => {
    console.log('HTTP server closed');
    shutdown();
  });
});

// Initialize the database table on startup
initializeDatabase();
