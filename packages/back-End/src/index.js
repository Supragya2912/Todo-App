const express = require('express');
const app = express();
const connectMongo = require('./mongo');
const port = 3001; // Change this to match the listening port
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

// Update CORS configuration for development
app.use(cors({
    origin: '*',
}));

app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/todo', require('../routes/routes')());

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
