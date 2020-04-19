const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const posts = require('./routes/postRoute');
const people = require('./routes/userRoute');
const shop = require('./routes/shopRoute')
const dbURI = process.env.REACT_APP_DB_URI || require('./secrets').dbURI;
const app = express();
const port = process.env.PORT || 5000;

const WebSocket = require('ws')
// const wss = new WebSocket("ws://backend:8989/");
const wss = new WebSocket.Server({ port: 8989 })
// console.log(typeof(users))
const users = [] 




const broadcast = (data, ws) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client !== ws) {
      client.send(JSON.stringify(data))
    }
  })
}
// This is JavaScript an object oriented language.
wss.on('connection', (ws) => {
  let index
  ws.on('message', (message) => {
    const data = JSON.parse(message)
    switch (data.type) {
      case 'ADD_USER': {
        index = users.length
        users.push({name:data.name, id: index+1})
        ws.send(JSON.stringify({
          type: 'USERS_LIST',
          users
        }))
        broadcast({       
          type: 'USERS_LIST',
          users
        }, ws)
        break
      }
      case 'ADD_MESSAGE':
        broadcast({
          type: 'ADD_MESSAGE',
          message: data.message,
          author: data.author
        }, ws)
        break
      default:
        break
    }
  })

  ws.on('close', () => {
    users.splice(index,1)
    broadcast({
      type:'USERS_LIST',
      users
    }, ws)
  })
})

// app.use(cors())
// Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization','*'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  return next();
});

mongoose
  .connect(
    dbURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Failed to connect to MongoDB', err));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use('/posts', posts);
app.use('/users', people);
app.use('/create-shop', shop);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '..', 'client', 'build', 'index.html')
    );
  });
}

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});
