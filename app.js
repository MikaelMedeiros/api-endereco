const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Rotas
require('./src/controllers/estado.controller')(app);
require('./src/controllers/cidade.controller')(app);

app.listen(3000, ( )=> console.log('API: Estou viva!') );