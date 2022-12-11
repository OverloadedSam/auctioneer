require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('./middlewares/cors');

const server = http.createServer(app);

if (app.get('env') !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

connectDB();

app.use(cors);

const port = process.env.PORT || 8000;
server.listen(port, (error) => {
  console.log(`The server is up and running at port: ${port}`);
});
