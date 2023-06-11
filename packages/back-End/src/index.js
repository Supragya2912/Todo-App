const express = require('express');
const app = express();
const connectMongo = require('./mongo');
const port = 3000;
const cors = require('cors');

// const routes = require('../routes/routes');

connectMongo();

// Custom logger middleware
const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl;

    res.on('finish', () => {
        const statusCode = res.statusCode;
        console.log(`${timestamp} - ${method} ${url} - ${statusCode}`);
    });
  
    next();
}

app.use(cors({
    origin: 'http://localhost:3001',
  }));
  
app.use(express.json());
app.use(logger);
app.use('/todo', require('../routes/routes')());


app.listen(3000, () => {
    console.log(`Server is running on port ${port}`);
});