const express = require('express'); 
const router = express.Router();
const Cidade = require('../models/cidade.model');

router.get('/', (req, res) => {
    res.send('Cidade!');
});

router.post('/', (req, res) => {
    return res.send(req.body);
});

module.exports = app => app.use('/cidades', router);