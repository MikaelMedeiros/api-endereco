const express = require('express');
const router = express.Router();
const Estado = require('../models/estado.model');

router.get('/', async (req, res) => {
    try {
        const estados = await Estado.find( {} );        
        return res.send(estados);   
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }    
});

router.post('/', async (req, res) => { 
    try {
        const { sigla } = req.body;

        if(await Estado.findOne({ sigla }))
            return res.status(400).send({ status: res.statusCode, erro: 'Já existe um estado com essa sigla.' });    

        const estado = await Estado.create(req.body);
        
        return res.status(201).send({ estado });
    }  catch(erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    } 
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;        
        const estado = await Estado.findById(id);

        if(!estado) 
            return res.status(404).send({ status: res.statusCode, erro: 'Esse estado não existe.' });    
        
        return res.send(estado);    
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }    
});

router.put('/:id', async (req, res) => {
    try {
        const filtro = { _id: req.params.id};
        const estadoAtualizado = { $set: req.body };
        await Estado.updateOne(filtro, estadoAtualizado);        
        return res.send({ status: res.statusCode, mensagem: 'Estado atualizado.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const filtro = { _id: req.params.id};              
        await Estado.deleteOne(filtro);
        return res.send({ status: res.statusCode, mensagem: 'Estado removido.' });
    } catch (erro) {
        return res.status(400).send({status: res.statusCode, mensagem: 'Requisição inválida', erro: erro});
    }
});

module.exports = app => app.use('/estados', router);
