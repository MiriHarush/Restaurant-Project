const http = require('http');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { app } = require('./app');

dotenv.config();

const server = http.createServer(app)

const mongoURL = process.env.MONGO_URL;

mongoose.connect(mongoURL)
    .then(() => {
        console.log(`connected to database`);
    }).catch((err) => {
        console.log(`error to connect to database`);
        console.log(err);
    });

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`the server is running on port ${PORT}`);
})
