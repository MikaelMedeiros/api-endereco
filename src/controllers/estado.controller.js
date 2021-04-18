const express = require('express');
const router = express.Router();
const Estado = require('../models/estado.model');

router.get('/', async (req, res) => {
    try {
        const estados = await Estado.find( {} );        
        return res.send(estados);   
    } catch (error) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }    
});

router.post('/', async (req, res) => { 
    try {
        const { sigla } = req.body;

        if(await Estado.findOne({ sigla }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe um estado com essa sigla.' });    

        const estado = await Estado.create(req.body);

        return res.send({ estado });
    }  catch(erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    } 
});

module.exports = app => app.use('/estados', router);
