const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
//Rotas
require('./src/controllers/estado.controller')(app);
require('./src/controllers/cidade.controller')(app);

app.listen(3000, ( )=> console.log('API: Estou viva!') );