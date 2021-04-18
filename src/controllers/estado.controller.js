const express = require('express');
const router = express.Router();
const Estado = require('../models/estado.model');

router.get('/', (req, res) => {
    res.send('Estado!');
});

router.post('/', (req, res) => {    
    return res.send(req.body);
});

module.exports = app => app.use('/estados', router);
