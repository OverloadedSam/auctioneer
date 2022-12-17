require('dotenv').config();
const http = require('http');
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
const userRoutes = require('./routes/users');
const auctionRoutes = require('./routes/auctions');

const server = http.createServer(app);

if (app.get('env') !== 'production') {
  const morgan = require('morgan');
  app.use(morgan('tiny'));
}

connectDB();

app.use(cors);

app.use(express.json({ extended: true, limit: '20mb' }));

const baseUrl = process.env.BASE_URL_PREFIX;

app.use(baseUrl, userRoutes); // User Routes
app.use(baseUrl, auctionRoutes); // Auction Routes

app.use(errorHandler); // Custom error handler

const port = process.env.PORT || 8000;
server.listen(port, (error) => {
  console.log(`The server is up and running at port: ${port}`);
});
