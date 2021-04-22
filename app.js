const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Rotas
require('./src/controllers/estado.controller')(app);
require('./src/controllers/cidade.controller')(app);

const options = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
};

https.createServer(options, app).listen(3000, ( )=> console.log('API: Estou viva!'));